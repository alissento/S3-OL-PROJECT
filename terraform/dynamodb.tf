resource "aws_dynamodb_table" "fb4u_products" {
  name = "fb4u_products"
  read_capacity = 5
  write_capacity = 5
  hash_key = "team"

  attribute {
    name = "team"
    type = "S"
  }
}

resource "aws_dynamodb_table_item" "test_item" {
  table_name = aws_dynamodb_table.fb4u_products.name
  hash_key = aws_dynamodb_table.fb4u_products.hash_key
  item = <<ITEM
  {
    "team": {"S": "Barcelona"},
    "price": {"N": "100"},
    "photo": {"S": "examplelink"}
  }
  ITEM
}