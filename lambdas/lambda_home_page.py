import simplejson as json
import boto3
import random

def lambda_handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('fb4u_ads')
    
    response = table.scan()
    items = response['Items']
    
    selected_items = random.sample(items, 3)
    
    ads = []
    for item in selected_items:
        ad_id = item['ad_id']
        ad_label = item['ad_label']
        ad_photo = f'{ad_id}.png'

        ads.append({
            'ad_id': ad_id,
            'ad_label': ad_label,
            'ad_photo': ad_photo
        })

    return {
        'statusCode': 200,
        'body': json.dumps(ads)
    }