import simplejson as json
import boto3 # AWS SDK for Python
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event
    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    table = dynamodb.Table('fb4u_products') # Connect to the DynamoDB table

    try:
        response = table.query(IndexName='fb4u_tag',KeyConditionExpression=Key('tag').eq('kit')) # Query the DynamoDB table for all items with the tag 'kit'
        data = response["Items"] # Get the items from the response
        kits = json.loads(json.dumps(data)) # Convert the items to JSON
        
        products = []
        
        for kit in kits: # Iterate through the kits, get the most important data and append it to the products list
            product_id = kit['product_id']
            team_name = kit['team_name']
            season = kit['season']
            side = kit['side']
            teamLabel = f"{team_name} {side} {season}"
            price = kit['price']
            photoID = f"{product_id}.png"
            productDescription = kit['description']
            productTag = kit['tag']
            products.append({
                'productLabel': teamLabel,
                'price': price,
                'photoID': photoID,
                'product_id': product_id,
                'productDescription': productDescription,
                'productTag': productTag
            })
            
            
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps(products) # Return the products list as JSON
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({'error': str(e)}) # Return an error message as JSON
        }
 