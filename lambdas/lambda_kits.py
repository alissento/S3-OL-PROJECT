def lambda_handler(event, context):
    print("Kits!")
    return {
        'statusCode': 200,
        'body': "Kits!",
        'headers': {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    }
