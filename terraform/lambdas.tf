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
  name = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_lambda_function" "list_kits" {
  function_name = "list_kits"
  filename = "test.zip"
  role = aws_iam_role.iam_for_lambda.arn
  runtime = "python3.12"
  handler = "test.lambda_handler"
}