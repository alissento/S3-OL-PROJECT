resource "aws_s3_bucket" "s3b" { // Defining the S3 bucket
  bucket        = local.domain_name   // My own personal domain for testing
  force_destroy = true
}

resource "aws_s3_bucket_cors_configuration" "s3_cors" { // Defining the CORS configuration for the S3 bucket
  bucket = aws_s3_bucket.s3b.id
  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_public_access_block" "s3b_enable_public_access" { // Disabling public access block
  bucket = aws_s3_bucket.s3b.id

  block_public_acls   = false
  block_public_policy = false
}
resource "aws_s3_bucket_website_configuration" "website_s3b" { // Defining the website settings for S3 bucket
  bucket = aws_s3_bucket.s3b.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}
resource "aws_s3_bucket_policy" "bucket_policy_for_website" { // Setting the bucket policy
  bucket = aws_s3_bucket.s3b.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.s3b.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.s3b_enable_public_access]
}

resource "aws_s3_object" "photos_upload" { // Adding images to the S3 bucket
  for_each = fileset("../website/images/", "**")
  bucket   = aws_s3_bucket.s3b.bucket
  key      = "images/${each.key}"
  source   = "../website/images/${each.value}"
}
output "website_url" { // Output of the URL of the website
  value = "http://${aws_s3_bucket_website_configuration.website_s3b.website_endpoint}"
}
