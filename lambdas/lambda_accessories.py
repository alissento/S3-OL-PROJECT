def lambda_handler(event, context):
    print("Accessories!")
    return {
        'statusCode': 200,
        'body': "Accessories!",
        'headers': {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    }
