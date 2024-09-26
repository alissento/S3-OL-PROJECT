import json, boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('fb4u_products')

def load_data(json_file):

    with open(json_file) as file:
        items = json.load(file)

    for item in items:
        print(f"Inserting item: {item}")
        table.put_item(Item=item)

    
load_data('data.json')