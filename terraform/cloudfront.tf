provider "aws" {
  region = "us-east-1"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.s3b.bucket}.s3.amazonaws.com"
    origin_id   = "S3-${aws_s3_bucket.s3b.bucket}"
  }

  enabled             = true
  is_ipv6_enabled     = false
  comment             = "S3 bucket website distribution"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.website_bucket.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "nknez.tech"
  validation_method = "DNS"

  tags = {
    Name = "nknez.tech certificate"
  }
}
