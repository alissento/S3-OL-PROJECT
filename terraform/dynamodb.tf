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
    name = "team_name"
    type = "S"
  }

  global_secondary_index {
    name               = "fb4u_teams"
    hash_key           = "team_name"
    write_capacity     = 5
    read_capacity      = 5
    projection_type    = "INCLUDE"
    non_key_attributes = ["product_id"]
  }
}