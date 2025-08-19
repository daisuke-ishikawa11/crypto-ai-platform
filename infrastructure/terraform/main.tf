terraform {
  required_version = ">= 1.6.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }

  backend "s3" {
    bucket         = var.terraform_state_bucket
    key            = "crypto-ai-platform/terraform.tfstate"
    region         = var.aws_region
    encrypt        = true
    dynamodb_table = var.terraform_state_lock_table
  }
}

# Configure AWS Provider
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "crypto-ai-platform"
      Environment = var.environment
      ManagedBy   = "terraform"
      Owner       = "defi-team"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Configure Kubernetes provider
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

# Configure Helm provider
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}

# Local values
locals {
  name = "crypto-ai-${var.environment}"
  
  vpc_cidr = var.environment == "production" ? "10.0.0.0/16" : "10.1.0.0/16"
  
  azs = slice(data.aws_availability_zones.available.names, 0, 3)
  
  tags = {
    Project     = "crypto-ai-platform"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

################################################################################
# VPC
################################################################################

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = local.name
  cidr = local.vpc_cidr

  azs             = local.azs
  private_subnets = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 4, k)]
  public_subnets  = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 48)]
  intra_subnets   = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 52)]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"
  enable_vpn_gateway = false

  enable_dns_hostnames = true
  enable_dns_support   = true

  # VPC Flow Logs
  enable_flow_log                      = true
  create_flow_log_cloudwatch_iam_role  = true
  create_flow_log_cloudwatch_log_group = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }

  tags = local.tags
}

################################################################################
# EKS Cluster
################################################################################

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name                   = local.name
  cluster_version                = var.kubernetes_version
  cluster_endpoint_public_access = true

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  control_plane_subnet_ids       = module.vpc.intra_subnets

  # Encryption key
  create_kms_key = true
  cluster_encryption_config = {
    resources        = ["secrets"]
    provider_key_arn = module.eks.kms_key_arn
  }

  # Logging
  cluster_enabled_log_types = ["audit", "api", "authenticator"]

  # IRSA
  enable_irsa = true

  # Security group rules
  cluster_security_group_additional_rules = {
    ingress_nodes_ephemeral_ports_tcp = {
      description                = "Nodes on ephemeral ports"
      protocol                   = "tcp"
      from_port                  = 1025
      to_port                    = 65535
      type                       = "ingress"
      source_node_security_group = true
    }
  }

  node_security_group_additional_rules = {
    ingress_self_all = {
      description = "Node to node all ports/protocols"
      protocol    = "-1"
      from_port   = 0
      to_port     = 0
      type        = "ingress"
      self        = true
    }
  }

  # EKS Managed Node Groups
  eks_managed_node_groups = {
    main = {
      name         = "${local.name}-main"
      description  = "Main EKS managed node group"

      subnet_ids = module.vpc.private_subnets

      min_size     = var.environment == "production" ? 3 : 2
      max_size     = var.environment == "production" ? 20 : 10
      desired_size = var.environment == "production" ? 3 : 2

      ami_type       = "AL2_x86_64"
      instance_types = var.environment == "production" ? ["m5.large", "m5.xlarge"] : ["t3.medium", "t3.large"]
      
      capacity_type = "ON_DEMAND"

      # Launch template
      create_launch_template = true
      launch_template_name   = "${local.name}-main"

      ebs_optimized           = true
      vpc_security_group_ids  = [module.eks.node_security_group_id]
      disable_api_termination = false

      # EBS
      block_device_mappings = {
        xvda = {
          device_name = "/dev/xvda"
          ebs = {
            volume_size           = 100
            volume_type           = "gp3"
            iops                  = 3000
            throughput            = 150
            encrypted             = true
            delete_on_termination = true
          }
        }
      }

      # User data
      pre_bootstrap_user_data = <<-EOT
        #!/bin/bash
        /opt/aws/bin/cfn-init -v --stack $${AWS::StackName} --resource NodeLaunchTemplate --region $${AWS::Region}
        yum update -y
        yum install -y amazon-cloudwatch-agent
      EOT

      # Labels
      labels = {
        Environment = var.environment
        NodeType    = "main"
      }

      # Taints
      taints = []

      tags = {
        Name = "${local.name}-main"
      }
    }

    spot = {
      name         = "${local.name}-spot"
      description  = "Spot instances for cost optimization"

      subnet_ids = module.vpc.private_subnets

      min_size     = 0
      max_size     = var.environment == "production" ? 10 : 5
      desired_size = var.environment == "production" ? 2 : 1

      ami_type       = "AL2_x86_64"
      instance_types = ["m5.large", "m4.large", "m5a.large", "m4.xlarge", "m5.xlarge", "m5a.xlarge"]
      capacity_type  = "SPOT"

      # Labels
      labels = {
        Environment = var.environment
        NodeType    = "spot"
      }

      # Taints for spot instances
      taints = [
        {
          key    = "spot"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      ]

      tags = {
        Name = "${local.name}-spot"
      }
    }
  }

  # Fargate
  fargate_profiles = {
    kube_system = {
      name = "kube-system"
      selectors = [
        { namespace = "kube-system" }
      ]
    }
    
    crypto_ai_production = {
      name = "crypto-ai-production"
      selectors = [
        { 
          namespace = "crypto-ai-production"
          labels = {
            compute = "fargate"
          }
        }
      ]
    }
  }

  # aws-auth ConfigMap
  manage_aws_auth_configmap = true

  aws_auth_roles = [
    {
      rolearn  = module.eks_blueprints_addons.karpenter.node_instance_profile_arn
      username = "system:node:{{EC2PrivateDNSName}}"
      groups = [
        "system:bootstrappers",
        "system:nodes",
      ]
    },
  ]

  tags = local.tags
}

################################################################################
# EKS Blueprints Addons
################################################################################

module "eks_blueprints_addons" {
  source = "aws-ia/eks-blueprints-addons/aws"

  cluster_name      = module.eks.cluster_name
  cluster_endpoint  = module.eks.cluster_endpoint
  cluster_version   = module.eks.cluster_version
  oidc_provider_arn = module.eks.oidc_provider_arn

  # Core addons
  eks_addons = {
    coredns = {
      most_recent = true
      configuration_values = jsonencode({
        replicaCount = var.environment == "production" ? 3 : 2
      })
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent    = true
      before_compute = true
      configuration_values = jsonencode({
        env = {
          ENABLE_POD_ENI                    = "true"
          ENABLE_PREFIX_DELEGATION          = "true"
          POD_SECURITY_GROUP_ENFORCING_MODE = "standard"
        }
        enableNetworkPolicy = "true"
      })
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  # Third-party addons
  enable_cert_manager                 = true
  enable_aws_load_balancer_controller = true
  enable_cluster_autoscaler           = true
  enable_metrics_server               = true
  enable_prometheus                   = var.environment == "production"
  enable_grafana                      = var.environment == "production"
  enable_karpenter                    = true

  # NGINX Ingress Controller
  enable_ingress_nginx = true
  ingress_nginx = {
    values = [
      yamlencode({
        controller = {
          replicaCount = var.environment == "production" ? 3 : 2
          
          service = {
            annotations = {
              "service.beta.kubernetes.io/aws-load-balancer-type"                              = "nlb"
              "service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled" = "true"
            }
          }
          
          config = {
            use-gzip                    = "true"
            enable-brotli              = "true"
            proxy-body-size            = "10m"
            proxy-connect-timeout      = "30"
            proxy-send-timeout         = "30"
            proxy-read-timeout         = "30"
            worker-processes           = "auto"
            worker-connections         = "65536"
            worker-rlimit-nofile       = "65536"
            keep-alive-requests        = "100"
            upstream-keepalive-connections = "100"
          }
          
          resources = {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }
          
          nodeSelector = {
            NodeType = "main"
          }
          
          affinity = {
            podAntiAffinity = {
              requiredDuringSchedulingIgnoredDuringExecution = [
                {
                  labelSelector = {
                    matchExpressions = [
                      {
                        key      = "app.kubernetes.io/name"
                        operator = "In"
                        values   = ["ingress-nginx"]
                      }
                    ]
                  }
                  topologyKey = "kubernetes.io/hostname"
                }
              ]
            }
          }
        }
      })
    ]
  }

  tags = local.tags
}

################################################################################
# RDS Database
################################################################################

module "rds" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${local.name}-db"

  engine               = "postgres"
  engine_version       = "15.4"
  family               = "postgres15"
  major_engine_version = "15"
  instance_class       = var.environment == "production" ? "db.r6g.large" : "db.t3.micro"

  allocated_storage     = var.environment == "production" ? 100 : 20
  max_allocated_storage = var.environment == "production" ? 1000 : 100
  storage_encrypted     = true

  db_name                = "cryptoai"
  username               = "cryptoai"
  manage_master_user_password = true
  port                   = 5432

  multi_az               = var.environment == "production"
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [module.rds_security_group.security_group_id]

  maintenance_window              = "Mon:00:00-Mon:03:00"
  backup_window                  = "03:00-06:00"
  enabled_cloudwatch_logs_exports = ["postgresql"]
  create_cloudwatch_log_group     = true

  backup_retention_period = var.environment == "production" ? 30 : 7
  skip_final_snapshot     = var.environment != "production"
  deletion_protection     = var.environment == "production"

  performance_insights_enabled          = true
  performance_insights_retention_period = var.environment == "production" ? 7 : 7
  create_monitoring_role                = true
  monitoring_interval                   = 60

  parameters = [
    {
      name  = "log_checkpoints"
      value = 1
    },
    {
      name  = "log_connections"
      value = 1
    },
    {
      name  = "log_disconnections"
      value = 1
    },
    {
      name  = "log_lock_waits"
      value = 1
    },
    {
      name  = "log_min_duration_statement"
      value = 5000
    },
    {
      name  = "auto_explain.log_min_duration"
      value = 5000
    },
    {
      name  = "auto_explain.log_verbose"
      value = 1
    },
    {
      name  = "log_line_prefix"
      value = "%t:%r:%u@%d:[%p]:"
    },
    {
      name  = "log_statement"
      value = "ddl"
    }
  ]

  tags = local.tags
}

# RDS Security Group
module "rds_security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "${local.name}-rds"
  description = "Security group for RDS database"
  vpc_id      = module.vpc.vpc_id

  ingress_with_source_security_group_id = [
    {
      from_port                = 5432
      to_port                  = 5432
      protocol                 = "tcp"
      description              = "PostgreSQL access from EKS"
      source_security_group_id = module.eks.cluster_primary_security_group_id
    },
    {
      from_port                = 5432
      to_port                  = 5432
      protocol                 = "tcp"
      description              = "PostgreSQL access from EKS nodes"
      source_security_group_id = module.eks.node_security_group_id
    }
  ]

  tags = local.tags
}

################################################################################
# ElastiCache Redis
################################################################################

module "redis" {
  source = "cloudposse/elasticache-redis/aws"

  availability_zones         = local.azs
  namespace                 = "crypto-ai"
  environment               = var.environment
  stage                     = var.environment
  name                      = "redis"
  
  engine_version            = "7.0"
  instance_type            = var.environment == "production" ? "cache.r6g.large" : "cache.t3.micro"
  cluster_size             = var.environment == "production" ? 3 : 1
  port                     = 6379
  parameter_group_name     = var.environment == "production" ? "default.redis7.cluster.on" : "default.redis7"
  
  vpc_id                   = module.vpc.vpc_id
  subnets                  = module.vpc.private_subnets
  security_groups          = [module.redis_security_group.security_group_id]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token                = random_password.redis_auth_token.result
  
  automatic_failover_enabled = var.environment == "production"
  multi_az_enabled          = var.environment == "production"
  
  apply_immediately         = var.environment != "production"
  maintenance_window        = "sun:03:00-sun:05:00"
  snapshot_window           = "06:30-08:30"
  snapshot_retention_limit  = var.environment == "production" ? 7 : 1

  log_delivery_configuration = var.environment == "production" ? [
    {
      destination      = aws_cloudwatch_log_group.redis[0].name
      destination_type = "cloudwatch-logs"
      log_format       = "text"
      log_type         = "slow-log"
    }
  ] : []

  tags = local.tags
}

# Redis Security Group
module "redis_security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "${local.name}-redis"
  description = "Security group for Redis cache"
  vpc_id      = module.vpc.vpc_id

  ingress_with_source_security_group_id = [
    {
      from_port                = 6379
      to_port                  = 6379
      protocol                 = "tcp"
      description              = "Redis access from EKS"
      source_security_group_id = module.eks.cluster_primary_security_group_id
    },
    {
      from_port                = 6379
      to_port                  = 6379
      protocol                 = "tcp"
      description              = "Redis access from EKS nodes"
      source_security_group_id = module.eks.node_security_group_id
    }
  ]

  tags = local.tags
}

# Redis CloudWatch Log Group
resource "aws_cloudwatch_log_group" "redis" {
  count             = var.environment == "production" ? 1 : 0
  name              = "/aws/elasticache/${local.name}/redis"
  retention_in_days = 30

  tags = local.tags
}

# Redis Auth Token
resource "random_password" "redis_auth_token" {
  length  = 32
  special = true
}

################################################################################
# CloudFront CDN
################################################################################

module "cloudfront" {
  source = "terraform-aws-modules/cloudfront/aws"

  aliases = var.environment == "production" ? 
    ["crypto-ai-platform.com", "www.crypto-ai-platform.com"] : 
    ["staging.crypto-ai-platform.com"]

  comment             = "${local.name} CloudFront distribution"
  default_root_object = "index.html"
  enabled             = true
  http_version        = "http2and3"
  is_ipv6_enabled     = true
  price_class         = var.environment == "production" ? "PriceClass_All" : "PriceClass_100"
  retain_on_delete    = false
  wait_for_deployment = false

  create_origin_access_control = true
  origin_access_control = {
    s3_oac = {
      description      = "CloudFront access to S3"
      origin_type      = "s3"
      signing_behavior = "always"
      signing_protocol = "sigv4"
    }
  }

  origin = {
    alb = {
      domain_name = module.eks_blueprints_addons.ingress_nginx.ingress_nginx_controller_service_hostname
      custom_origin_config = {
        http_port              = 80
        https_port             = 443
        origin_protocol_policy = "https-only"
        origin_ssl_protocols   = ["TLSv1.2"]
      }
    }
  }

  default_cache_behavior = {
    target_origin_id         = "alb"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    compress                 = true
    query_string             = true
    query_string_cache_keys  = ["*"]
    headers                  = ["Authorization", "CloudFront-Forwarded-Proto", "Host"]
    cookies_forward          = "all"

    lambda_function_association = {}

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  ordered_cache_behavior = [
    {
      path_pattern             = "/api/*"
      target_origin_id         = "alb"
      viewer_protocol_policy   = "https-only"
      allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods           = ["GET", "HEAD", "OPTIONS"]
      compress                 = true
      query_string             = true
      headers                  = ["*"]
      cookies_forward          = "all"
      min_ttl                  = 0
      default_ttl              = 0
      max_ttl                  = 0
    },
    {
      path_pattern             = "/_next/static/*"
      target_origin_id         = "alb"
      viewer_protocol_policy   = "redirect-to-https"
      allowed_methods          = ["GET", "HEAD"]
      cached_methods           = ["GET", "HEAD"]
      compress                 = true
      query_string             = false
      min_ttl                  = 86400
      default_ttl              = 31536000
      max_ttl                  = 31536000
    }
  ]

  viewer_certificate = {
    acm_certificate_arn      = var.environment == "production" ? module.acm[0].acm_certificate_arn : null
    cloudfront_default_certificate = var.environment != "production"
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  web_acl_id = aws_wafv2_web_acl.main.arn

  tags = local.tags
}

################################################################################
# WAF
################################################################################

resource "aws_wafv2_web_acl" "main" {
  name  = "${local.name}-waf"
  scope = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "AWS-AWSManagedRulesCommonRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "CommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "KnownBadInputsRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "RateLimitRule"
    priority = 3

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = var.environment == "production" ? 2000 : 10000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitRule"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${local.name}-waf"
    sampled_requests_enabled   = true
  }

  tags = local.tags
}

################################################################################
# ACM Certificate
################################################################################

module "acm" {
  count   = var.environment == "production" ? 1 : 0
  source  = "terraform-aws-modules/acm/aws"

  domain_name = "crypto-ai-platform.com"
  zone_id     = data.aws_route53_zone.main[0].zone_id

  subject_alternative_names = [
    "*.crypto-ai-platform.com",
  ]

  wait_for_validation = true

  tags = local.tags
}

# Route53 Zone (assuming it exists)
data "aws_route53_zone" "main" {
  count = var.environment == "production" ? 1 : 0
  name  = "crypto-ai-platform.com"
}

################################################################################
# Secrets Manager
################################################################################

# Database secrets
resource "aws_secretsmanager_secret" "rds_master_password" {
  name                    = "${local.name}/rds/master-password"
  description             = "RDS master password for ${local.name}"
  recovery_window_in_days = var.environment == "production" ? 30 : 0

  tags = local.tags
}

resource "aws_secretsmanager_secret_version" "rds_master_password" {
  secret_id     = aws_secretsmanager_secret.rds_master_password.id
  secret_string = module.rds.db_instance_password
}

# Redis auth token
resource "aws_secretsmanager_secret" "redis_auth_token" {
  name                    = "${local.name}/redis/auth-token"
  description             = "Redis auth token for ${local.name}"
  recovery_window_in_days = var.environment == "production" ? 30 : 0

  tags = local.tags
}

resource "aws_secretsmanager_secret_version" "redis_auth_token" {
  secret_id     = aws_secretsmanager_secret.redis_auth_token.id
  secret_string = random_password.redis_auth_token.result
}

################################################################################
# CloudWatch Alarms
################################################################################

# EKS Cluster Alarms
resource "aws_cloudwatch_metric_alarm" "eks_cluster_failed_request_count" {
  alarm_name          = "${local.name}-eks-failed-requests"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "cluster_failed_request_count"
  namespace           = "ContainerInsights"
  period              = "300"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "This metric monitors EKS cluster failed requests"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    ClusterName = module.eks.cluster_name
  }

  tags = local.tags
}

# RDS Alarms
resource "aws_cloudwatch_metric_alarm" "rds_cpu" {
  count               = var.environment == "production" ? 1 : 0
  alarm_name          = "${local.name}-rds-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/RDS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors RDS CPU utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    DBInstanceIdentifier = module.rds.db_instance_identifier
  }

  tags = local.tags
}

# SNS Topic for alerts
resource "aws_sns_topic" "alerts" {
  name = "${local.name}-alerts"

  tags = local.tags
}

################################################################################
# Backup
################################################################################

# AWS Backup Vault
resource "aws_backup_vault" "main" {
  count       = var.environment == "production" ? 1 : 0
  name        = "${local.name}-backup-vault"
  kms_key_arn = aws_kms_key.backup[0].arn

  tags = local.tags
}

# KMS Key for backups
resource "aws_kms_key" "backup" {
  count                   = var.environment == "production" ? 1 : 0
  description             = "KMS key for AWS Backup"
  deletion_window_in_days = 7

  tags = local.tags
}

resource "aws_kms_alias" "backup" {
  count         = var.environment == "production" ? 1 : 0
  name          = "alias/${local.name}-backup"
  target_key_id = aws_kms_key.backup[0].key_id
}

# Backup Plan
resource "aws_backup_plan" "main" {
  count = var.environment == "production" ? 1 : 0
  name  = "${local.name}-backup-plan"

  rule {
    rule_name         = "daily_backup"
    target_vault_name = aws_backup_vault.main[0].name
    schedule          = "cron(0 5 ? * * *)"

    recovery_point_tags = {
      Environment = var.environment
      Project     = "crypto-ai-platform"
    }

    lifecycle {
      cold_storage_after = 30
      delete_after       = 120
    }
  }

  tags = local.tags
}