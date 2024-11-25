data "aws_iam_policy_document" "lambda_assume_role" { // Create a policy document for the Lambda function
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_policy" "lambda_policy" { // Create a policy for the Lambda function
  name = "lambda_policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [ // Allow the Lambda function to access the DynamoDB tables
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        "Effect" : "Allow",
        "Resource" : [aws_dynamodb_table.fb4u_products.arn, "${aws_dynamodb_table.fb4u_products.arn}/index/fb4u_tag", aws_dynamodb_table.fb4u_ads.arn, aws_dynamodb_table.fb4u_users.arn, aws_dynamodb_table.fb4u_cart.arn]
      },
      {
        "Action" : [ // Allow the Lambda function to write logs
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

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" { // Attach the policy to the role
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_role" "iam_for_lambda" { // Create a role for the Lambda function
  name               = "role_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_lambda_function" "list_products" { // Create a Lambda function for the kits listing
  function_name = "list_products"
  filename      = "../lambdas/lambda_load_products.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime                  // Set the runtime to Python 3.12
  handler       = "lambda_load_products.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout                  // Set the timeout to 30 seconds
  memory_size   = local.lambda_memory_size
}

resource "aws_lambda_function" "list_home_page" { // Create a Lambda function for the home page
  function_name = "list_home_page"
  filename      = "../lambdas/lambda_home_page.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime              // Set the runtime to Python 3.12
  handler       = "lambda_home_page.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout              // Set the timeout to 30 seconds
  memory_size   = local.lambda_memory_size
}

resource "aws_lambda_function" "store_user_data" { // Create a Lambda function for the home page
  function_name = "store_user_data"
  filename      = "../lambdas/lambda_store_user_data.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime                    // Set the runtime to Python 3.12
  handler       = "lambda_store_user_data.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout                    // Set the timeout to 30 seconds
  memory_size   = local.lambda_memory_size
}

resource "aws_lambda_function" "get_user_data" { // Create a Lambda function for the home page
  function_name = "get_user_data"
  filename      = "../lambdas/lambda_get_user_data.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime                  // Set the runtime to Python 3.12
  handler       = "lambda_get_user_data.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout                  // Set the timeout to 30 seconds
  memory_size   = local.lambda_memory_size
}

resource "aws_lambda_function" "add_to_cart" { // Create a Lambda function for the home page
  function_name = "add_to_cart"
  filename      = "../lambdas/lambda_add_to_cart.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime                // Set the runtime to Python 3.12
  handler       = "lambda_add_to_cart.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout                // Set the timeout to 30 seconds
  memory_size   = local.lambda_memory_size
}
resource "aws_lambda_function" "load_cart" { // Create a Lambda function for the home page
  function_name = "load_cart"
  filename      = "../lambdas/lambda_load_cart.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime              // Set the runtime to Python 3.12
  handler       = "lambda_load_cart.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout
  memory_size   = local.lambda_memory_size
}

resource "aws_lambda_function" "clear_cart" { // Create a Lambda function for the home page
  function_name = "clear_cart"
  filename      = "../lambdas/lambda_clear_cart.zip" // Set the filename to the Lambda function zip file
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = local.lambda_runtime               // Set the runtime to Python 3.12
  handler       = "lambda_clear_cart.lambda_handler" // Set the handler to lambda_handler
  timeout       = local.lambda_timeout               // Set the timeout to 30 seconds
  memory_size   = local.lambda_memory_size
}