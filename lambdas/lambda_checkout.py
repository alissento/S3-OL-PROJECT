import simplejson as json
import boto3
from boto3.dynamodb.conditions import Key
import uuid  # For generating unique order IDs
from datetime import datetime  # For adding the order date

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    tableCart = dynamodb.Table('fb4u_cart')
    tableOrders = dynamodb.Table('fb4u_orders') 

    try:
        body = json.loads(event['body'])
        user_id = body.get('user_id')

        try:
            responseCart = tableCart.get_item(Key={'user_id': user_id})
            cartData = responseCart.get('Item', {})
            if not cartData or 'items' not in cartData:
                raise Exception("Cart is empty or invalid.")
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': str(e)})
            }

        order_id = str(uuid.uuid4())
        order_date = datetime.now().strftime('%d-%m-%Y') 
        order_status = 'Pending'

        order_items = []
        for product in cartData['items']:
            product_id = product['product_id']
            size = product['size']

            order_items.append({
                'product_id': product_id,
                'size': size
            })

        order_data = {
            'order_id': order_id,
            'user_id': user_id,
            'items': order_items,
            'order_date': order_date,
            'order_status': order_status
        }

        tableOrders.put_item(Item=order_data)
        tableCart.delete_item(Key={'user_id': user_id})

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'Order placed successfully!', 'order_id': order_id})
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
