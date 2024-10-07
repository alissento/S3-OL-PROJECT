import simplejson as json
import boto3
import random

def lambda_handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('fb4u_ads')
    
    response = table.scan()
    items = response['Items']
    
    selected_items = random.sample(items, 3)
    selected_ids = [item['ad_id'] for item in selected_items]

    return {
        'statusCode': 200,
        'body': json.dumps({
            'selected_ids': selected_ids,
            'selected_items': selected_items
        })
    }