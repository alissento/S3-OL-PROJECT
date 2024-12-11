// This file is used to create the API Gateway for the project
resource "aws_apigatewayv2_api" "api_gw_http_fb4u" { // Create an API Gateway
  name          = "api-gateway-http-fb4u"
  protocol_type = "HTTP" // The protocol used by the API Gateway

  cors_configuration {
    allow_origins = ["*"] // Allow the origin of the request
    allow_methods = ["GET", "OPTIONS", "POST"]
    allow_headers = ["*"]
  }

  depends_on = [aws_s3_bucket_website_configuration.website_s3b]
}

resource "aws_acm_certificate" "tls_cert_api" { // Create a certificate for the API Gateway
  domain_name       = local.api_domain_name
  validation_method = "DNS"

  tags = {
    Name = "api.nknez.tech certificate"
  }
}

resource "aws_route53_record" "tls_cert_api_validation_cname" {
  for_each = {
    for dvo in aws_acm_certificate.tls_cert_api.domain_validation_options :
    dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  zone_id = local.route53_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 300
  records = [each.value.value]

  depends_on = [aws_acm_certificate.tls_cert_api]
}

resource "aws_acm_certificate_validation" "tls_cert_api_validation" {
  certificate_arn         = aws_acm_certificate.tls_cert_api.arn
  validation_record_fqdns = [for record in aws_route53_record.tls_cert_api_validation_cname: record.fqdn]

  depends_on = [ aws_acm_certificate.tls_cert_api ]
}

resource "aws_apigatewayv2_domain_name" "custom_domain_api_gw" {
  domain_name = local.api_domain_name
  domain_name_configuration {
    certificate_arn = aws_acm_certificate.tls_cert_api.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [ aws_acm_certificate_validation.tls_cert_api_validation ]
}

resource "aws_apigatewayv2_api_mapping" "api_mapping" {
  api_id      = aws_apigatewayv2_api.api_gw_http_fb4u.id
  domain_name = aws_apigatewayv2_domain_name.custom_domain_api_gw.domain_name
  stage       = aws_apigatewayv2_stage.default_stage.name

  depends_on = [ aws_acm_certificate_validation.tls_cert_api_validation ]
}

resource "aws_route53_record" "custom_domain_api_gw_record" {
  zone_id = local.route53_id
  name    = aws_apigatewayv2_domain_name.custom_domain_api_gw.domain_name
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.custom_domain_api_gw.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.custom_domain_api_gw.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
resource "aws_apigatewayv2_integration" "load_products_integration" { // Create an integration for the kits listing
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.list_products.invoke_arn
}

resource "aws_apigatewayv2_integration" "home_ads_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.list_home_page.invoke_arn
}

resource "aws_apigatewayv2_integration" "store_user_data_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.store_user_data.invoke_arn
}

resource "aws_apigatewayv2_integration" "get_user_data_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.get_user_data.invoke_arn
}

resource "aws_apigatewayv2_integration" "add_to_cart_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.add_to_cart.invoke_arn
}

resource "aws_apigatewayv2_integration" "load_cart_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.load_cart.invoke_arn
}

resource "aws_apigatewayv2_integration" "clear_cart_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.clear_cart.invoke_arn
}

resource "aws_apigatewayv2_integration" "checkout_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.checkout.invoke_arn
}

resource "aws_apigatewayv2_integration" "get_orders_integration" { // Create an integration for the home page
  api_id           = aws_apigatewayv2_api.api_gw_http_fb4u.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.get_orders.invoke_arn
}


resource "aws_apigatewayv2_route" "route_products" { // Create a route for the product listing
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /loadProducts"
  target    = "integrations/${aws_apigatewayv2_integration.load_products_integration.id}"
}

resource "aws_apigatewayv2_route" "route_home" { // Create a route for the home page
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /"
  target    = "integrations/${aws_apigatewayv2_integration.home_ads_integration.id}"
}

resource "aws_apigatewayv2_route" "storeUserData_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "POST /storeUserData"
  target    = "integrations/${aws_apigatewayv2_integration.store_user_data_integration.id}"
}
resource "aws_apigatewayv2_route" "getUserData_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /getUserData"
  target    = "integrations/${aws_apigatewayv2_integration.get_user_data_integration.id}"
}

resource "aws_apigatewayv2_route" "addToCart_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "POST /addToCart"
  target    = "integrations/${aws_apigatewayv2_integration.add_to_cart_integration.id}"
}

resource "aws_apigatewayv2_route" "loadCart_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /loadCart"
  target    = "integrations/${aws_apigatewayv2_integration.load_cart_integration.id}"
}

resource "aws_apigatewayv2_route" "clearCart_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "POST /clearCart"
  target    = "integrations/${aws_apigatewayv2_integration.clear_cart_integration.id}"
}

resource "aws_apigatewayv2_route" "checkout_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "POST /checkout"
  target    = "integrations/${aws_apigatewayv2_integration.checkout_integration.id}"
}

resource "aws_apigatewayv2_route" "get_orders_route" {
  api_id    = aws_apigatewayv2_api.api_gw_http_fb4u.id
  route_key = "GET /getOrders"
  target    = "integrations/${aws_apigatewayv2_integration.get_orders_integration.id}"
}

resource "aws_lambda_permission" "products_api_gateway_permission" { // Create a permission for the kits listing
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.list_products.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "home_api_gateway_permission" { // Create a permission for the home page
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.list_home_page.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "store_user_data_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.store_user_data.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}
resource "aws_lambda_permission" "get_user_data_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_user_data.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "add_to_cart_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.add_to_cart.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "load_cart_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.load_cart.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "clear_cart_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.clear_cart.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "get_orders_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_orders.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_lambda_permission" "checkout_permission" { // Create a permission for the storing user data
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.checkout.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api_gw_http_fb4u.execution_arn}/*"
}

resource "aws_apigatewayv2_stage" "default_stage" { // Create a stage for the API Gateway
  api_id      = aws_apigatewayv2_api.api_gw_http_fb4u.id
  name        = "$default"
  auto_deploy = true
}

