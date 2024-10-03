import simplejson, boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('fb4u_products')

    try:
        response = table.query(IndexName='fb4u_tag',KeyConditionExpression=Key('tag').eq('boots'))
        data = response["Items"]
        boots = simplejson.loads(simplejson.dumps(data))
        
        products = []
        
        for boot in boots:
            product_id = boot['product_id']
            brand = boot['brand']
            label = boot['label']
            price = boot['price']
            bootLabel = f"{brand} {label}"
            photoID = f"{product_id}.png"
            products.append({
                'productLabel': bootLabel,
                'price': price,
                'photoID': photoID,
                'product_id': product_id
            })
            
            
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': simplejson.dumps(products)
        }
    
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': simplejson.dumps({'error': str(e)})
        }
 