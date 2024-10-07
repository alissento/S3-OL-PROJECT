import json, boto3

dynamodb = boto3.resource('dynamodb')

def load_data(json_file, tableName):
    table = dynamodb.Table(tableName)
    with open(json_file) as file:
        items = json.load(file)

    for item in items:
        print(f"Inserting item: {item}")
        table.put_item(Item=item)

    
load_data('data.json', 'fb4u_products')
load_data('ads.json', 'fb4u_ads')