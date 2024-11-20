import simplejson as json
import boto3
import random

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event

    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    table = dynamodb.Table('fb4u_ads') # Connect to the DynamoDB table
    
    response = table.scan() # Scan the DynamoDB table for all items
    items = response['Items'] # Get the items from the response
    
    selected_items = random.sample(items, 3) # Select 3 random items from the items list
    
    ads = []
    for item in selected_items: # Iterate through the selected items, get the most important data and append it to the ads list
        ad_id = item['ad_id']
        ad_label = item['ad_label']
        ad_photo = f'{ad_id}.png'
        ad_product_id = item['product_id']

        ads.append({
            'ad_id': ad_id,
            'ad_label': ad_label,
            'ad_photo': ad_photo,
            'ad_product_id': ad_product_id
        })

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(ads) # Return the ads list as JSON
    }