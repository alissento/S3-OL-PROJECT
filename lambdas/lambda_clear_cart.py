import simplejson as json
import boto3 # AWS SDK for Python
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context): # Lambda handler function, called when the Lambda is triggered by an event
    dynamodb = boto3.resource('dynamodb') # Create a DynamoDB resource
    table = dynamodb.Table('fb4u_cart') # Connect to the DynamoDB table

    try:
        body = json.loads(event['body'])
        print(body)
        user_id = body['user_id']
        print(user_id)
        
        try:
            response = table.delete_item(Key={'user_id': user_id}) # Delete the item from the DynamoDB table
            print(f"Response: {response}")

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'message': 'Cart cleared successfully'})
            }
        except Exception as e:
            print(f"Error: {e}")
            raise e
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'Error clearing cart'})
        }