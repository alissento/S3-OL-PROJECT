# Assume role for Lambdas
data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "role_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

# Test lambda function
resource "aws_lambda_function" "list_kits" {
  function_name = "list_kits"
  filename = "../lambdas/lambda_kits.zip"
  role = aws_iam_role.iam_for_lambda.arn
  runtime = "python3.12"
  handler = "lambda_kits.lambda_handler"
}

resource "aws_lambda_function" "list_boots" {
  function_name = "list_boots"
  filename = "../lambdas/lambda_boots.zip"
  role = aws_iam_role.iam_for_lambda.arn
  runtime = "python3.12"
  handler = "lambda_boots.lambda_handler"
}

resource "aws_lambda_function" "list_accessories" {
  function_name = "list_accessories"
  filename = "../lambdas/lambda_accessories.zip"
  role = aws_iam_role.iam_for_lambda.arn
  runtime = "python3.12"
  handler = "lambda_accessories.lambda_handler"
}