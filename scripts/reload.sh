#/bin/bash

cd ../terraform/
terraform destroy --auto-approve
terraform apply --auto-approve

cd ../scripts/
python3 data_injection.py

echo "DONE"
