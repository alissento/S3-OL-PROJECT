data "template_file" "index_html" {
  template = file("index.html")
  vars = {
    api_url = aws_apigatewayv2_api.api_gw_http_fb4u.api_endpoint
  }
}

# Defining the S3 bucket
resource "aws_s3_bucket" "s3b" {
  bucket = "fbforyou.com"
  force_destroy = true
}

# Disabling public access block
resource "aws_s3_bucket_public_access_block" "s3b_enable_public_access" {
  bucket = aws_s3_bucket.s3b.id

  block_public_acls = false
  block_public_policy = false
}

# Defining the website settings for S3 bucket
resource "aws_s3_bucket_website_configuration" "website_s3b" {
  bucket = aws_s3_bucket.s3b.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Setting the bucket policy
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

resource "aws_s3_object" "test_index_html" {
  bucket = aws_s3_bucket.s3b.bucket
  key = "index.html"
  content = data.template_file.index_html.rendered
  content_type = "text/html"

  depends_on = [ data.template_file.index_html ]
}

output "Website URL" {
  value = "http://${aws_s3_bucket_website_configuration.website_s3b.website_endpoint}"
}