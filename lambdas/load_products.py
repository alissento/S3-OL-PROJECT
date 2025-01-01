import simplejson as json
import boto3 # AWS SDK for Python
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event
    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    table = dynamodb.Table('fb4u_products') # Connect to the DynamoDB table
    operation_bool = False # Set the operation boolean to false
    try:
        query_params = event['queryStringParameters'] # Get the query string parameters
        print(query_params)

        if 'product_tag' in query_params:
            product_tag = query_params['product_tag'] # Get the product tag from the query string
            response = table.query(IndexName='fb4u_tag', KeyConditionExpression=Key('tag').eq(product_tag)) # Query the DynamoDB table for all items with the tag
            data = response["Items"] # Get the items from the response
        elif 'product_id' in query_params:
            product_id = query_params['product_id'] # Get the product id from the query string
            response = table.get_item(Key={'product_id': product_id}) # Get the item with the product id from the DynamoDB table
            data = response["Item"] # Get the items from the response
            operation_bool = True # Set the operation boolean to true
        else:
            raise ValueError("Invalid query parameters")
        
        products = json.loads(json.dumps(data)) # Convert the items to JSON
        print(products)

        productResponse = []

        if operation_bool: # If the operation boolean is true, return the product as a single item
            product = products
            productResponse = response_creation(product)
        else: # If the operation boolean is false, return the products as a list
            for product in products: # Iterate through the kits, get the most important data and append it to the products list
                productResponse += response_creation(product)
        
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
 
def response_creation(product): # Function to create the response for the products
    productResponse = []

    product_id = product['product_id']
    productTag = product['tag']

    if productTag == 'kits':
        team_name = product['team_name']
        season = product['season']
        side = product['side']
        productLabel = f"{team_name} {side} {season}"
    elif productTag == 'boots':
        brand = product['brand']
        label = product['label']
        productLabel = f"{brand} {label}"
    elif productTag == 'accessories':
        label = product['label']
        productLabel = label
            
    price = product['price']
    photoID = f"{product_id}.png"
    productDescription = product['description']
            
    productResponse.append({
        'productLabel': productLabel,
        'price': price,
        'photoID': photoID,
        'product_id': product_id,
        'productDescription': productDescription,
        'productTag': productTag,
        'productType': product.get('type', '')
    })

    print(productResponse)

    return productResponse