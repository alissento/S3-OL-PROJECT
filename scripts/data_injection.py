import json, boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')


def load_data(json_file, tableName, key_attribute):
    table = dynamodb.Table(tableName)
    with open(json_file) as file:
        items = json.load(file)

    for item in items:
        try:
            table.put_item(
                Item=item,
                ConditionExpression=f"attribute_not_exists({key_attribute})"
                )
            print(f"Inserted item: {item[key_attribute]}")
        except ClientError as e:
            if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                print(f"Item already exists, skipping: {item[key_attribute]}")
            else:
                raise

load_data('kits.json', 'fb4u_products', 'product_id')
load_data('boots.json', 'fb4u_products', 'product_id')
load_data('accessories.json', 'fb4u_products', 'product_id')
load_data('ads.json', 'fb4u_ads', 'ad_id')