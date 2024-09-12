def lambda_handler(event, context):
    print("I am working!")

    return {
        'statusCode': 200,
        'body': "I am working!",
        'headers': {
            'Content-Type': 'text/plain'
        }
    }
