variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name (staging, production)"
  type        = string
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be either staging or production."
  }
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.28"
}

variable "terraform_state_bucket" {
  description = "S3 bucket for Terraform state"
  type        = string
}

variable "terraform_state_lock_table" {
  description = "DynamoDB table for Terraform state locking"
  type        = string
}

# Application variables
variable "app_name" {
  description = "Application name"
  type        = string
  default     = "crypto-ai-platform"
}

variable "app_version" {
  description = "Application version"
  type        = string
  default     = "v1.0.0"
}

# Domain variables
variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "crypto-ai-platform.com"
}

variable "create_route53_zone" {
  description = "Whether to create Route53 hosted zone"
  type        = bool
  default     = false
}

# Database variables
variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = null
}

variable "db_allocated_storage" {
  description = "RDS allocated storage in GB"
  type        = number
  default     = null
}

variable "db_max_allocated_storage" {
  description = "RDS max allocated storage in GB"
  type        = number
  default     = null
}

variable "db_backup_retention_period" {
  description = "RDS backup retention period in days"
  type        = number
  default     = null
}

# Redis variables
variable "redis_node_type" {
  description = "ElastiCache Redis node type"
  type        = string
  default     = null
}

variable "redis_num_cache_nodes" {
  description = "Number of cache nodes"
  type        = number
  default     = null
}

# EKS variables
variable "eks_node_groups" {
  description = "EKS managed node groups configuration"
  type = map(object({
    instance_types = list(string)
    capacity_type  = string
    min_size      = number
    max_size      = number
    desired_size  = number
  }))
  default = {}
}

# Monitoring variables
variable "enable_detailed_monitoring" {
  description = "Enable detailed CloudWatch monitoring"
  type        = bool
  default     = true
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}

# Security variables
variable "enable_waf" {
  description = "Enable AWS WAF"
  type        = bool
  default     = true
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed to access the application"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# Backup variables
variable "backup_schedule" {
  description = "Backup schedule (cron expression)"
  type        = string
  default     = "cron(0 5 ? * * *)"
}

variable "backup_retention_days" {
  description = "Backup retention period in days"
  type        = number
  default     = 30
}

# Auto-scaling variables
variable "enable_cluster_autoscaler" {
  description = "Enable cluster autoscaler"
  type        = bool
  default     = true
}

variable "enable_horizontal_pod_autoscaler" {
  description = "Enable horizontal pod autoscaler"
  type        = bool
  default     = true
}

variable "enable_vertical_pod_autoscaler" {
  description = "Enable vertical pod autoscaler"
  type        = bool
  default     = false
}

# Cost optimization variables
variable "enable_spot_instances" {
  description = "Enable spot instances for cost optimization"
  type        = bool
  default     = true
}

variable "spot_instance_types" {
  description = "Instance types for spot instances"
  type        = list(string)
  default     = ["m5.large", "m5.xlarge", "m4.large", "m4.xlarge", "m5a.large", "m5a.xlarge"]
}

# Additional tags
variable "additional_tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}