resource "aws_dynamodb_table" "fb4u_products" {
  name           = "fb4u_products"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "product_id"

  attribute {
    name = "product_id"
    type = "S"
  }

  attribute {
    name = "tag"
    type = "S"
  }

  global_secondary_index {
    name               = "fb4u_tag"
    hash_key           = "tag"
    write_capacity     = 5
    read_capacity      = 5
    projection_type    = "ALL"
  }
}

resource "aws_dynamodb_table" "fb4u_ads" {
  name           = "fb4u_ads"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "ad_id"

  attribute {
    name = "ad_id"
    type = "S"
  }
}