# Replace API URL inside the index.html
data "template_file" "script_js" {
  template = file("../website/script.js")
  vars = {
    api_url = aws_apigatewayv2_api.api_gw_http_fb4u.api_endpoint
  }
}

# Defining the S3 bucket
resource "aws_s3_bucket" "s3b" {
  bucket = "fbforyou.com"
  force_destroy = true
}

resource "aws_s3_bucket_cors_configuration" "s3_cors" {
  bucket = aws_s3_bucket.s3b.id
  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
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

# Adding index.html to the S3 bucket
resource "aws_s3_object" "index_html_upload" {
  bucket = aws_s3_bucket.s3b.bucket
  key = "index.html"
  source = "../website/index.html"
  content_type = "text/html"

  depends_on = [ data.template_file.script_js ]
}

resource "aws_s3_object" "js_script_upload" {
  bucket = aws_s3_bucket.s3b.bucket
  key = "script.js"
  content = data.template_file.script_js.rendered
  content_type = "application/javascript"

  depends_on = [ data.template_file.script_js ]
}

resource "aws_s3_object" "css_upload" {
  bucket = aws_s3_bucket.s3b.bucket
  key = "style.css"
  source = "../website/style.css"
  content_type = "text/css"

  depends_on = [ data.template_file.script_js ]
}

resource "aws_s3_object" "photos_upload" {
  for_each = fileset("../website/images/", "**")
  bucket = aws_s3_bucket.s3b.bucket
  key = "images/${each.key}"
  source = "../website/images/${each.value}"

  depends_on = [ data.template_file.script_js ]
}

# Output of the URL of the website
output "website_url" {
  value = "http://${aws_s3_bucket_website_configuration.website_s3b.website_endpoint}"
}


# Comment just to test the CI pipeline 123
