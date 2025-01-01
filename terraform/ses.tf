resource "aws_ses_email_identity" "ses_email" {
    email = "knez.norbert@gmail.com"
}

resource "aws_ses_domain_identity" "ses_domain" {
    domain = local.domain_name
}

resource "aws_route53_record" "ses_txt_record" {
    zone_id = local.route53_id
    name    = "_amazonses.${aws_ses_domain_identity.ses_domain.id}"
    type    = "TXT"
    ttl     = "600"
    records = [ aws_ses_domain_identity.ses_domain.verification_token ]
}

resource "aws_ses_domain_identity_verification" "ses_verification" {
    domain = aws_ses_domain_identity.ses_domain.domain

    depends_on = [ aws_route53_record.ses_txt_record ]
}

resource "aws_ses_domain_dkim" "ses_dkim" {
  domain = aws_ses_domain_identity.ses_domain.domain
}

resource "aws_route53_record" "example_amazonses_dkim_record" {
  count   = 3
  zone_id = local.route53_id
  name    = "${aws_ses_domain_dkim.ses_dkim.dkim_tokens[count.index]}._domainkey"
  type    = "CNAME"
  ttl     = "300"
  records = ["${aws_ses_domain_dkim.ses_dkim.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# change to SES v2