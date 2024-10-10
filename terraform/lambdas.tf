# Assume role for Lambdas
data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_policy" "lambda_policy" {
  name = "lambda_policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:Query"
        ],
        "Effect" : "Allow",
        "Resource" : [aws_dynamodb_table.fb4u_products.arn, "${aws_dynamodb_table.fb4u_products.arn}/index/fb4u_tag", aws_dynamodb_table.fb4u_ads.arn]
      },
      {
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Effect" : "Allow",
        "Resource" : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "role_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

# Test lambda function
resource "aws_lambda_function" "list_kits" {
  function_name = "list_kits"
  filename      = "../lambdas/lambda_kits.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = "python3.12"
  handler       = "lambda_kits.lambda_handler"
  timeout       = 15
}

resource "aws_lambda_function" "list_boots" {
  function_name = "list_boots"
  filename      = "../lambdas/lambda_boots.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = "python3.12"
  handler       = "lambda_boots.lambda_handler"
  timeout       = 15
}

resource "aws_lambda_function" "list_accessories" {
  function_name = "list_accessories"
  filename      = "../lambdas/lambda_accessories.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = "python3.12"
  handler       = "lambda_accessories.lambda_handler"
  timeout       = 15
}

resource "aws_lambda_function" "list_home_page" {
  function_name = "list_home_page"
  filename      = "../lambdas/lambda_home_page.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = "python3.12"
  handler       = "lambda_home_page.lambda_handler"
  timeout       = 15
}