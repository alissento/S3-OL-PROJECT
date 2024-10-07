resource "aws_apigatewayv2_api" "api_gw_http_fb4u" {
  name          = "api-gateway-http-fb4u"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["http://${aws_s3_bucket_website_configuration.website_s3b.website_endpoint}"]
    #allow_origins = ["*"]
    allow_methods = ["GET", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
  }

  depends_on = [aws_s3_bucket_website_configuration.website_s3b]
}

resource "aws_apigatewayv2_integration" "kits_listing_integration" {
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.list_kits.invoke_arn
}

resource "aws_apigatewayv2_integration" "boots_listing_integration" {
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.list_boots.invoke_arn
}

resource "aws_apigatewayv2_integration" "accessories_listing_integration" {
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.list_accessories.invoke_arn
}

resource "aws_apigatewayv2_integration" "home_ads_integration" {
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.list_home_page.invoke_arn
}

resource "aws_apigatewayv2_route" "route_kits" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /kits"
  target    = "integrations/${aws_apigatewayv2_integration.kits_listing_integration.id}"
}

resource "aws_apigatewayv2_route" "boots_kits" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /boots"
  target    = "integrations/${aws_apigatewayv2_integration.boots_listing_integration.id}"
}

resource "aws_apigatewayv2_route" "accessories_kits" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /accessories"
  target    = "integrations/${aws_apigatewayv2_integration.accessories_listing_integration.id}"
}

resource "aws_apigatewayv2_route" "route_home" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /"
  target    = "integrations/${aws_apigatewayv2_integration.home_ads_integration.id}"
}

resource "aws_lambda_permission" "kits_api_gateway_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.list_kits.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "boots_api_gateway_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.list_boots.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "accessories_api_gateway_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.list_accessories.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "home_api_gateway_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.list_home_page.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.api_gw_http_fb4u.id
  name        = "$default"
  auto_deploy = true
}

output "http_api_url" {
  value = aws_apigatewayv2_api.api_gw_http_fb4u.api_endpoint
}