variable "target_region" {
  description = "Type a desired AWS region to deploy this project"
  type = string
  default = "eu-central-1"

  validation {
    condition = contains(["us-east-1", "us-east-2", "us-west-1", "us-west-2", "ca-central-1", "sa-east-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-west-3", "eu-north-1", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ap-northeast-2", "ap-northeast-3", "ap-south-1"], var.target_region)
    error_message = "Invalid region. Allowed regions are: us-east-1, us-east-2, us-west-1, us-west-2, ca-central-1, sa-east-1, eu-central-1, eu-west-1, eu-west-2, eu-west-3, eu-north-1, ap-southeast-1, ap-southeast-2, ap-northeast-1, ap-northeast-2, ap-northeast-3, ap-south-1."
  }
}

provider "aws" {
  region = var.target_region
}

# Define the S3 bucket
resource "aws_s3_bucket" "s3b" {
  bucket = "fbforyou.com"
  force_destroy = true

}

resource "aws_s3_bucket_public_access_block" "s3b_enable_public_access" {
  bucket = aws_s3_bucket.s3b.id

  block_public_acls = false
  block_public_policy = false
}

# Define the website settings for S3 bucket
resource "aws_s3_bucket_website_configuration" "website_s3b" {
  bucket = aws_s3_bucket.s3b.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Set the bucket policy for public access (if required)
resource "aws_s3_bucket_policy" "bucket_policy_for_website" {
  bucket = aws_s3_bucket.s3b.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = "*",
        Action = "s3:GetObject",
        Resource = "${aws_s3_bucket.s3b.arn}/*"
      }
    ]
  })

  depends_on = [ aws_s3_bucket_public_access_block.s3b_enable_public_access ]
}