import simplejson as json
import boto3 # AWS SDK for Python
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event
    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    table = dynamodb.Table('fb4u_products') # Connect to the DynamoDB table

    try:
        product_tag = event['queryStringParameters']['product_tag'] # Get the product tag from the query string

        response = table.query(IndexName='fb4u_tag',KeyConditionExpression=Key('tag').eq(product_tag)) # Query the DynamoDB table for all items with the tag 'kit'
        data = response["Items"] # Get the items from the response
        print(data)
        products = json.loads(json.dumps(data)) # Convert the items to JSON
        print(products)

        productResponse = []
        
        for product in products: # Iterate through the kits, get the most important data and append it to the products list
            product_id = product['product_id']
               
            if product_tag == 'kits':
                team_name = product['team_name']
                season = product['season']
                side = product['side']
                productLabel = f"{team_name} {side} {season}"
            elif product_tag == 'boots':
                brand = product['brand']
                label = product['label']
                productLabel = f"{brand} {label}"
            
            price = product['price']
            photoID = f"{product_id}.png"
            productDescription = product['description']
            productTag = product['tag']
            productResponse.append({
                'productLabel': productLabel,
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
            'body': json.dumps(productResponse) # Return the products list as JSON
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
 