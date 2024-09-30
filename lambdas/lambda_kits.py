import simplejson, boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('fb4u_products')

    try:
        response = table.scan()
        kits = response["Items"]
        kitsTest = simplejson.loads(simplejson.dumps(kits))
        
        products = []
        
        for kit in kitsTest:
            product_id = kit['product_id']
            team_name = kit['team_name']
            season = kit['season']
            teamLabel = f"{team_name} {season}"
            price = kit['price']
            photoID = f"{product_id}.png"
            products.append({
                'teamLabel': teamLabel,
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
 