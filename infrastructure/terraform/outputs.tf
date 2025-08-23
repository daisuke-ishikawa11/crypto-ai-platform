################################################################################
# VPC
################################################################################

output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

output "private_subnets" {
  description = "IDs of the private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "IDs of the public subnets"
  value       = module.vpc.public_subnets
}

################################################################################
# EKS
################################################################################

output "cluster_name" {
  description = "Name of the EKS cluster"
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_version" {
  description = "The Kubernetes version for the EKS cluster"
  value       = module.eks.cluster_version
}

output "cluster_security_group_id" {
  description = "Security group ids attached to the cluster control plane"
  value       = module.eks.cluster_security_group_id
}

output "cluster_iam_role_name" {
  description = "IAM role name associated with EKS cluster"
  value       = module.eks.cluster_iam_role_name
}

output "cluster_iam_role_arn" {
  description = "IAM role ARN associated with EKS cluster"
  value       = module.eks.cluster_iam_role_arn
}

output "cluster_certificate_authority_data" {
  description = "Base64 encoded certificate data required to communicate with the cluster"
  value       = module.eks.cluster_certificate_authority_data
}

output "cluster_primary_security_group_id" {
  description = "The cluster primary security group ID created by the EKS cluster"
  value       = module.eks.cluster_primary_security_group_id
}

output "node_security_group_id" {
  description = "ID of the node shared security group"
  value       = module.eks.node_security_group_id
}

output "oidc_provider_arn" {
  description = "The ARN of the OIDC Provider if enabled"
  value       = module.eks.oidc_provider_arn
}

################################################################################
# EKS Managed Node Groups
################################################################################

output "eks_managed_node_groups" {
  description = "Map of attribute maps for all EKS managed node groups created"
  value       = module.eks.eks_managed_node_groups
}

output "eks_managed_node_groups_autoscaling_group_names" {
  description = "List of the autoscaling group names created by EKS managed node groups"
  value       = module.eks.eks_managed_node_groups_autoscaling_group_names
}

################################################################################
# Fargate
################################################################################

output "fargate_profiles" {
  description = "Map of attribute maps for all the Fargate profiles created"
  value       = module.eks.fargate_profiles
}

################################################################################
# RDS
################################################################################

output "db_instance_address" {
  description = "RDS instance hostname"
  value       = module.rds.db_instance_address
  sensitive   = true
}

output "db_instance_arn" {
  description = "RDS instance ARN"
  value       = module.rds.db_instance_arn
}

output "db_instance_availability_zone" {
  description = "RDS instance availability zone"
  value       = module.rds.db_instance_availability_zone
}

output "db_instance_endpoint" {
  description = "RDS instance endpoint"
  value       = module.rds.db_instance_endpoint
  sensitive   = true
}

output "db_instance_engine" {
  description = "RDS instance engine"
  value       = module.rds.db_instance_engine
}

output "db_instance_engine_version" {
  description = "RDS instance engine version"
  value       = module.rds.db_instance_engine_version
}

output "db_instance_id" {
  description = "RDS instance ID"
  value       = module.rds.db_instance_identifier
}

output "db_instance_port" {
  description = "RDS instance port"
  value       = module.rds.db_instance_port
  sensitive   = true
}

output "db_instance_status" {
  description = "RDS instance status"
  value       = module.rds.db_instance_status
}

output "db_instance_name" {
  description = "RDS instance database name"
  value       = module.rds.db_instance_db_name
}

output "db_instance_username" {
  description = "RDS instance master username"
  value       = module.rds.db_instance_username
  sensitive   = true
}

################################################################################
# ElastiCache Redis
################################################################################

output "redis_cluster_address" {
  description = "Redis cluster hostname"
  value       = module.redis.endpoint
  sensitive   = true
}

output "redis_cluster_id" {
  description = "Redis cluster ID"
  value       = module.redis.id
}

output "redis_cluster_arn" {
  description = "Redis cluster ARN"
  value       = module.redis.arn
}

output "redis_port" {
  description = "Redis port"
  value       = module.redis.port
}

output "redis_auth_token" {
  description = "Redis auth token"
  value       = random_password.redis_auth_token.result
  sensitive   = true
}

################################################################################
# CloudFront
################################################################################

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = module.cloudfront.cloudfront_distribution_id
}

output "cloudfront_distribution_arn" {
  description = "CloudFront Distribution ARN"
  value       = module.cloudfront.cloudfront_distribution_arn
}

output "cloudfront_distribution_domain_name" {
  description = "CloudFront Distribution Domain Name"
  value       = module.cloudfront.cloudfront_distribution_domain_name
}

output "cloudfront_distribution_hosted_zone_id" {
  description = "CloudFront Distribution Hosted Zone ID"
  value       = module.cloudfront.cloudfront_distribution_hosted_zone_id
}

################################################################################
# ALB
################################################################################

output "load_balancer_dns_name" {
  description = "Load balancer DNS name"
  value       = try(module.eks_blueprints_addons.ingress_nginx.ingress_nginx_controller_service_hostname, null)
}

output "load_balancer_hosted_zone_id" {
  description = "Load balancer hosted zone ID"
  value       = try(module.eks_blueprints_addons.ingress_nginx.ingress_nginx_controller_service_hosted_zone_id, null)
}

################################################################################
# WAF
################################################################################

output "waf_web_acl_id" {
  description = "WAF Web ACL ID"
  value       = aws_wafv2_web_acl.main.id
}

output "waf_web_acl_arn" {
  description = "WAF Web ACL ARN"
  value       = aws_wafv2_web_acl.main.arn
}

################################################################################
# ACM
################################################################################

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = var.environment == "production" ? module.acm[0].acm_certificate_arn : null
}

################################################################################
# Secrets Manager
################################################################################

output "rds_master_password_secret_arn" {
  description = "RDS master password secret ARN"
  value       = aws_secretsmanager_secret.rds_master_password.arn
  sensitive   = true
}

output "redis_auth_token_secret_arn" {
  description = "Redis auth token secret ARN"
  value       = aws_secretsmanager_secret.redis_auth_token.arn
  sensitive   = true
}

################################################################################
# Monitoring
################################################################################

output "sns_topic_arn" {
  description = "SNS topic ARN for alerts"
  value       = aws_sns_topic.alerts.arn
}

################################################################################
# kubectl Configuration
################################################################################

output "configure_kubectl" {
  description = "Configure kubectl: make sure you're logged in with the correct AWS profile and run the following command to update your kubeconfig"
  value       = "aws eks --region ${var.aws_region} update-kubeconfig --name ${module.eks.cluster_name}"
}

################################################################################
# Application URLs
################################################################################

output "application_url" {
  description = "Application URL"
  value       = var.environment == "production" ? "https://crypto-ai-platform.com" : "https://staging.crypto-ai-platform.com"
}

output "grafana_url" {
  description = "Grafana URL (if enabled)"
  value       = var.environment == "production" ? "https://grafana.crypto-ai-platform.com" : null
}

################################################################################
# Connection Information
################################################################################

output "database_connection_info" {
  description = "Database connection information"
  value = {
    host     = module.rds.db_instance_address
    port     = module.rds.db_instance_port
    database = module.rds.db_instance_db_name
    username = module.rds.db_instance_username
  }
  sensitive = true
}

output "redis_connection_info" {
  description = "Redis connection information"
  value = {
    host = module.redis.endpoint
    port = module.redis.port
  }
  sensitive = true
}

################################################################################
# Cost Optimization
################################################################################

output "estimated_monthly_cost" {
  description = "Estimated monthly cost (approximate)"
  value       = var.environment == "production" ? "~$800-1200 USD (depends on usage)" : "~$200-400 USD (depends on usage)"
}
