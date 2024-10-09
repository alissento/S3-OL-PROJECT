import simplejson as json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('fb4u_products')

    try:
        response = table.query(IndexName='fb4u_tag',KeyConditionExpression=Key('tag').eq('kit'))
        data = response["Items"]
        kits = json.loads(json.dumps(data))
        
        products = []
        
        for kit in kits:
            product_id = kit['product_id']
            team_name = kit['team_name']
            season = kit['season']
            side = kit['side']
            teamLabel = f"{team_name} {side} {season}"
            price = kit['price']
            photoID = f"{product_id}.png"
            productDescription = kit['description']
            productTag = kit['tag']
            products.append({
                'productLabel': teamLabel,
                'price': price,
                'photoID': photoID,
                'product_id': product_id,
                'productDescription': productDescription,
                'productTag': productTag
            })
            
            
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps(products)
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({'error': str(e)})
        }
 