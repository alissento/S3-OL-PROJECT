import simplejson as json
import boto3 # AWS SDK for Python
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event
    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    tableCart = dynamodb.Table('fb4u_cart') # Connect to the DynamoDB table
    tableProducts = dynamodb.Table('fb4u_products') # Connect to the DynamoDB table

    try:
        user_id = event['queryStringParameters']['user_id']

        try:
            responseCart = tableCart.get_item(Key={'user_id': user_id})
            print(f"Response cart: {responseCart}")
            cartData = responseCart['Item']
            print(f"Cart data: {cartData}")
            usersCart = []
        except Exception as e:
            print(f"Error: {e}")
            usersCart = []

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(usersCart) # Return the products list as JSON
            }

        for product in cartData['items']:
            product_id = product['product_id']
            size = product['size']

            response = tableProducts.get_item(Key={'product_id': product_id})
            print(f"Response1: {response}")
            responseProducts = response['Item']
            print(f"Response products: {responseProducts}")

            productTag = responseProducts['tag']

            if productTag == 'kits':
                team_name = responseProducts['team_name']
                season = responseProducts['season']
                side = responseProducts['side']
                productLabel = f"{team_name} {side} {season}"
            elif productTag == 'boots':
                brand = responseProducts['brand']
                label = responseProducts['label']
                productLabel = f"{brand} {label}"
            elif productTag == 'accessories':
                label = responseProducts['label']
                productLabel = label
                
            price = responseProducts['price']
            photoID = f"{product_id}.png"

            usersCart.append({
                'productLabel': productLabel,
                'price': price,
                'photoID': photoID,
                'product_id': product_id,
                'size': size,
                'user_id': user_id
            })

            print(f"Users cart: {usersCart}")    

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(usersCart) # Return the products list as JSON
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': str(e)})
        }