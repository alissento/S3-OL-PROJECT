import simplejson as json
import boto3 # AWS SDK for Python
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event
    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    table = dynamodb.Table('fb4u_cart') # Connect to the DynamoDB table

    try:
        body = json.loads(event['body'])
        print(f"Body: {body}")
        user_id = body['user_id']
        product_id = body['product_id']
        price = body['price']
        size = body['size']

        try:
            response = table.get_item(Key={'user_id': user_id})
            print(f"Response: {response}")

            if 'Item' in response:
                cart = response['Item']
                print(f"Cart: {cart}")
                if 'items' not in cart:
                    cart['items'] = []
                
                cart['items'].append({
                    'product_id': product_id,
                    'price': price,
                    'size': size
                })
                
                print(f"Cart after adding item: {cart}")
                table.put_item(Item=cart)
            else:
                table.put_item(Item={
                    'user_id': user_id,
                    'items': [{
                        'product_id': product_id,
                        'price': price,
                        'size': size
                    }]
                })
        except Exception as e:
            print(f"Error: {e}")
            raise e

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'Product added to cart successfully'})
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