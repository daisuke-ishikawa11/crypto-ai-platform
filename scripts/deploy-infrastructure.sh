#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
TERRAFORM_DIR="infrastructure/terraform"
AWS_REGION="${AWS_REGION:-us-west-2}"
ENVIRONMENT="${1:-staging}"

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Show usage
show_usage() {
    echo "Usage: $0 [ENVIRONMENT] [OPTIONS]"
    echo ""
    echo "Arguments:"
    echo "  ENVIRONMENT    Environment to deploy (staging|production) [default: staging]"
    echo ""
    echo "Options:"
    echo "  --help, -h     Show this help message"
    echo "  --plan         Only run terraform plan"
    echo "  --destroy      Destroy infrastructure"
    echo "  --auto-approve Auto approve terraform changes"
    echo "  --skip-k8s     Skip Kubernetes setup"
    echo ""
    echo "Examples:"
    echo "  $0 staging --plan           # Plan staging deployment"
    echo "  $0 production --auto-approve # Deploy to production"
    echo "  $0 staging --destroy         # Destroy staging environment"
}

# Validate environment
validate_environment() {
    if [[ ! "$ENVIRONMENT" =~ ^(staging|production)$ ]]; then
        print_error "Invalid environment: $ENVIRONMENT"
        print_error "Environment must be either 'staging' or 'production'"
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local tools=(
        "terraform:Terraform"
        "aws:AWS CLI"
        "kubectl:kubectl"
        "helm:Helm"
        "jq:jq"
    )
    
    for tool in "${tools[@]}"; do
        local cmd="${tool%%:*}"
        local name="${tool##*:}"
        
        if ! command -v "$cmd" &> /dev/null; then
            print_error "$name is required but not installed"
            exit 1
        fi
    done
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials not configured or invalid"
        exit 1
    fi
    
    print_success "All prerequisites met"
}

# Setup Terraform backend
setup_terraform_backend() {
    print_status "Setting up Terraform backend for $ENVIRONMENT..."
    
    local state_bucket="crypto-ai-terraform-state-$ENVIRONMENT"
    local lock_table="crypto-ai-terraform-lock-$ENVIRONMENT"
    
    # Create S3 bucket for Terraform state
    if ! aws s3 ls "s3://$state_bucket" &> /dev/null; then
        print_status "Creating Terraform state bucket: $state_bucket"
        aws s3 mb "s3://$state_bucket" --region "$AWS_REGION"
        
        # Enable versioning
        aws s3api put-bucket-versioning \
            --bucket "$state_bucket" \
            --versioning-configuration Status=Enabled
        
        # Enable server-side encryption
        aws s3api put-bucket-encryption \
            --bucket "$state_bucket" \
            --server-side-encryption-configuration '{
                "Rules": [
                    {
                        "ApplyServerSideEncryptionByDefault": {
                            "SSEAlgorithm": "AES256"
                        }
                    }
                ]
            }'
        
        print_success "Terraform state bucket created"
    fi
    
    # Create DynamoDB table for state locking
    if ! aws dynamodb describe-table --table-name "$lock_table" &> /dev/null; then
        print_status "Creating Terraform lock table: $lock_table"
        aws dynamodb create-table \
            --table-name "$lock_table" \
            --attribute-definitions AttributeName=LockID,AttributeType=S \
            --key-schema AttributeName=LockID,KeyType=HASH \
            --billing-mode PAY_PER_REQUEST \
            --region "$AWS_REGION"
        
        print_status "Waiting for DynamoDB table to be ready..."
        aws dynamodb wait table-exists --table-name "$lock_table" --region "$AWS_REGION"
        print_success "Terraform lock table created"
    fi
}

# Initialize Terraform
init_terraform() {
    print_status "Initializing Terraform..."
    
    cd "$TERRAFORM_DIR"
    
    # Create terraform.tfvars if it doesn't exist
    if [ ! -f "terraform.tfvars" ]; then
        print_warning "terraform.tfvars not found, creating from example..."
        cp terraform.tfvars.example terraform.tfvars
        
        # Update with environment-specific values
        sed -i "s/environment = \"staging\"/environment = \"$ENVIRONMENT\"/" terraform.tfvars
        sed -i "s/terraform_state_bucket = \"crypto-ai-terraform-state\"/terraform_state_bucket = \"crypto-ai-terraform-state-$ENVIRONMENT\"/" terraform.tfvars
        sed -i "s/terraform_state_lock_table = \"crypto-ai-terraform-lock\"/terraform_state_lock_table = \"crypto-ai-terraform-lock-$ENVIRONMENT\"/" terraform.tfvars
        
        print_warning "Please review and update terraform.tfvars with your specific values"
    fi
    
    terraform init \
        -backend-config="bucket=crypto-ai-terraform-state-$ENVIRONMENT" \
        -backend-config="key=crypto-ai-platform/terraform.tfstate" \
        -backend-config="region=$AWS_REGION" \
        -backend-config="dynamodb_table=crypto-ai-terraform-lock-$ENVIRONMENT"
    
    cd - > /dev/null
    
    print_success "Terraform initialized"
}

# Plan Terraform changes
plan_terraform() {
    print_status "Planning Terraform changes..."
    
    cd "$TERRAFORM_DIR"
    
    terraform plan \
        -var="environment=$ENVIRONMENT" \
        -var="aws_region=$AWS_REGION" \
        -out="tfplan-$ENVIRONMENT"
    
    cd - > /dev/null
    
    print_success "Terraform plan completed"
}

# Apply Terraform changes
apply_terraform() {
    print_status "Applying Terraform changes..."
    
    cd "$TERRAFORM_DIR"
    
    if [ "$AUTO_APPROVE" = true ]; then
        terraform apply "tfplan-$ENVIRONMENT"
    else
        terraform apply "tfplan-$ENVIRONMENT"
    fi
    
    cd - > /dev/null
    
    print_success "Terraform apply completed"
}

# Destroy Terraform resources
destroy_terraform() {
    print_warning "This will destroy all infrastructure for environment: $ENVIRONMENT"
    
    if [ "$AUTO_APPROVE" != true ]; then
        read -p "Are you sure you want to continue? (yes/no): " confirmation
        if [ "$confirmation" != "yes" ]; then
            print_status "Operation cancelled"
            exit 0
        fi
    fi
    
    cd "$TERRAFORM_DIR"
    
    if [ "$AUTO_APPROVE" = true ]; then
        terraform destroy \
            -var="environment=$ENVIRONMENT" \
            -var="aws_region=$AWS_REGION" \
            -auto-approve
    else
        terraform destroy \
            -var="environment=$ENVIRONMENT" \
            -var="aws_region=$AWS_REGION"
    fi
    
    cd - > /dev/null
    
    print_success "Infrastructure destroyed"
}

# Setup Kubernetes
setup_kubernetes() {
    print_status "Setting up Kubernetes configuration..."
    
    # Get cluster name from Terraform output
    cd "$TERRAFORM_DIR"
    local cluster_name=$(terraform output -raw cluster_name 2>/dev/null || echo "")
    cd - > /dev/null
    
    if [ -z "$cluster_name" ]; then
        print_error "Could not get cluster name from Terraform outputs"
        return 1
    fi
    
    # Update kubeconfig
    aws eks update-kubeconfig \
        --region "$AWS_REGION" \
        --name "$cluster_name"
    
    print_success "Kubernetes configuration updated"
    
    # Wait for cluster to be ready
    print_status "Waiting for cluster to be ready..."
    timeout=300
    while ! kubectl get nodes &> /dev/null; do
        sleep 5
        timeout=$((timeout - 5))
        if [ $timeout -le 0 ]; then
            print_error "Cluster did not become ready within 5 minutes"
            return 1
        fi
    done
    
    print_success "Cluster is ready"
    
    # Apply Kubernetes manifests
    print_status "Applying Kubernetes manifests..."
    
    # Create namespaces first
    kubectl apply -f k8s/namespace.yaml
    
    # Apply other manifests
    kubectl apply -f k8s/rbac.yaml
    kubectl apply -f k8s/configmap.yaml
    kubectl apply -f k8s/secret.yaml
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl apply -f k8s/ingress.yaml
    kubectl apply -f k8s/hpa.yaml
    kubectl apply -f k8s/network-policy.yaml
    
    print_success "Kubernetes manifests applied"
    
    # Wait for deployments to be ready
    print_status "Waiting for deployments to be ready..."
    kubectl wait --for=condition=available --timeout=600s \
        deployment/crypto-ai-$ENVIRONMENT \
        -n crypto-ai-$ENVIRONMENT
    
    print_success "Deployments are ready"
}

# Verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    cd "$TERRAFORM_DIR"
    
    # Get outputs
    local app_url=$(terraform output -raw application_url 2>/dev/null || echo "")
    local cluster_name=$(terraform output -raw cluster_name 2>/dev/null || echo "")
    
    cd - > /dev/null
    
    if [ -n "$cluster_name" ]; then
        # Check cluster status
        kubectl get nodes
        kubectl get pods -n "crypto-ai-$ENVIRONMENT"
        kubectl get services -n "crypto-ai-$ENVIRONMENT"
        
        # Check application health
        if [ -n "$app_url" ] && [ "$app_url" != "null" ]; then
            print_status "Testing application health endpoint..."
            if curl -f "$app_url/api/health" &> /dev/null; then
                print_success "Application health check passed"
            else
                print_warning "Application health check failed (this may be normal during initial deployment)"
            fi
        fi
    fi
    
    print_success "Deployment verification completed"
}

# Show deployment info
show_deployment_info() {
    print_status "Deployment Information"
    echo "========================"
    
    cd "$TERRAFORM_DIR"
    
    local app_url=$(terraform output -raw application_url 2>/dev/null || echo "Not available")
    local cluster_name=$(terraform output -raw cluster_name 2>/dev/null || echo "Not available")
    local db_endpoint=$(terraform output -raw db_instance_endpoint 2>/dev/null || echo "Not available")
    local redis_endpoint=$(terraform output -raw redis_cluster_address 2>/dev/null || echo "Not available")
    
    cd - > /dev/null
    
    echo "Environment: $ENVIRONMENT"
    echo "Application URL: $app_url"
    echo "EKS Cluster: $cluster_name"
    echo "Database: $db_endpoint"
    echo "Redis: $redis_endpoint"
    echo ""
    echo "To access the cluster:"
    echo "  aws eks update-kubeconfig --region $AWS_REGION --name $cluster_name"
    echo ""
    echo "To check application status:"
    echo "  kubectl get pods -n crypto-ai-$ENVIRONMENT"
}

# Main deployment function
main() {
    case "$1" in
        --help|-h)
            show_usage
            exit 0
            ;;
    esac
    
    validate_environment
    check_prerequisites
    
    if [ "$DESTROY" = true ]; then
        destroy_terraform
        return 0
    fi
    
    setup_terraform_backend
    init_terraform
    plan_terraform
    
    if [ "$PLAN_ONLY" = true ]; then
        return 0
    fi
    
    apply_terraform
    
    if [ "$SKIP_K8S" != true ]; then
        setup_kubernetes
        verify_deployment
    fi
    
    show_deployment_info
}

# Parse arguments
PLAN_ONLY=false
DESTROY=false
AUTO_APPROVE=false
SKIP_K8S=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --plan)
            PLAN_ONLY=true
            shift
            ;;
        --destroy)
            DESTROY=true
            shift
            ;;
        --auto-approve)
            AUTO_APPROVE=true
            shift
            ;;
        --skip-k8s)
            SKIP_K8S=true
            shift
            ;;
        --help|-h)
            show_usage
            exit 0
            ;;
        staging|production)
            ENVIRONMENT=$1
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Run main function
main

print_success "Infrastructure deployment completed successfully!"

exit 0