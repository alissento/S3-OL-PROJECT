def lambda_handler(event, context):
    print("Boots!")
    return {
        'statusCode': 200,
        'body': "Boots!",
        'headers': {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    }
