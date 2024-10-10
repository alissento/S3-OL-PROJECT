resource "aws_dynamodb_table" "fb4u_products" {
  name         = "fb4u_products"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "product_id"

  attribute {
    name = "product_id"
    type = "S"
  }

  attribute {
    name = "tag"
    type = "S"
  }

  global_secondary_index {
    name            = "fb4u_tag"
    hash_key        = "tag"
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "fb4u_ads" {
  name         = "fb4u_ads"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "ad_id"

  attribute {
    name = "ad_id"
    type = "S"
  }
}