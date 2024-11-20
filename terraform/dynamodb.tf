variable "dynamodb_billing_mode" {
  description = "The billing mode for the DynamoDB tables"
  type        = string
  default     = "PAY_PER_REQUEST"
}

resource "aws_dynamodb_table" "fb4u_products" { // Create a DynamoDB table for the products
  name         = "fb4u_products"
  billing_mode = var.dynamodb_billing_mode // Set the billing mode to pay per request
  hash_key     = "product_id"              // Set the hash key (primary key) to product_id

  attribute {
    name = "product_id"
    type = "S"
  }

  attribute { // Additional tag attribute for the global secondary index
    name = "tag"
    type = "S"
  }

  global_secondary_index { // Create a global secondary index for the tag attribute to allow querying by tag
    name            = "fb4u_tag"
    hash_key        = "tag"
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "fb4u_ads" { // Create a DynamoDB table for the ads
  name         = "fb4u_ads"
  billing_mode = var.dynamodb_billing_mode // Set the billing mode to pay per request
  hash_key     = "ad_id"                   // Set the hash key (primary key) to ad_id

  attribute {
    name = "ad_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "fb4u_users" { // Create a DynamoDB table for the users
  name         = "fb4u_users"
  billing_mode = var.dynamodb_billing_mode // Set the billing mode to pay per request
  hash_key     = "user_id"                 // Set the hash key (primary key) to user_id

  attribute {
    name = "user_id"
    type = "S"
  }

}

resource "aws_dynamodb_table" "fb4u_cart" { // Create a DynamoDB table for the cart
  name         = "fb4u_cart"
  billing_mode = var.dynamodb_billing_mode // Set the billing mode to pay per request
  hash_key     = "user_id"                 // Set the hash key (primary key) to user_id so that each user has a unique cart
  attribute {
    name = "user_id"
    type = "S"
  }

}