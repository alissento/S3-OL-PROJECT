provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  provider = aws.us-east-1

  aliases = [local.domain_name]

  origin {
    domain_name = "nknez.tech.s3-website.eu-central-1.amazonaws.com"
    origin_id   = "S3-Website-nknez.tech"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  comment             = "S3 bucket website distribution"
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id       = "S3-Website-nknez.tech"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.tls-cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  depends_on = [aws_acm_certificate.tls-cert]
}

resource "aws_acm_certificate" "tls-cert" {
  provider = aws.us-east-1

  domain_name       = local.domain_name
  validation_method = "DNS"

  tags = {
    Name = "nknez.tech certificate"
  }
}

resource "aws_route53_record" "record_for_cloudfront" {
  zone_id = local.route53_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}


/*
  TODO:
  maybe route53 hosted zone should be created in terraform instead of hardcoded
  add automatic cname validation for acm
 */