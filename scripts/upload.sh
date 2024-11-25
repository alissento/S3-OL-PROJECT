#!/bin/bash

cd ../vue-website/
npm run tailwindbuild
npm run build
aws s3 sync dist/ s3://nknez.tech --delete
cd ../terraform/
cloudfront_id=$(terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $cloudfront_id --paths "/*"
cd ../scripts/