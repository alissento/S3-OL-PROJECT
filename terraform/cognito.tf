resource "aws_cognito_user_pool" "fb4u_user_pool" {
  name = "fb4u_user_pool"
  username_attributes = ["email"]

  schema {
    attribute_data_type = "String"
    name                = "given_name"
    required            = true
  }

  schema {
    attribute_data_type = "String"
    name                = "family_name"
    required            = true
  }

  schema {
    attribute_data_type = "String"
    name                = "address"
    required            = true
  }

  schema {
    attribute_data_type = "String"
    name                = "phone_number"
    required            = true
  }


  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "You need to verify the email before you can access your account. Your verification code is {####}"
    email_subject        = "Verify your email!"
  }
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
}

resource "aws_cognito_user_pool_client" "app_client" {
  name = "app_client"

  user_pool_id = aws_cognito_user_pool.fb4u_user_pool.id
}
