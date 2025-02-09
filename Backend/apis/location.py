import json
import boto3
import logging
import requests
import datetime
from datetime import tzinfo
# Set up the logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)  # Adjust as needed

# # Initialize DynamoDB client
client = boto3.client('dynamodb')

def lambda_handler(event, context):
    logger.info("Lambda function has been invoked.")  # Log when the function is triggered

    if event.get('routeKey') == 'POST /location':  # Handling POST requests
        logger.info("Handling POST request to save location data.")
        return handle_post(event)

    elif event.get('routeKey') == 'GET /location':  # Handling GET requests
        logger.info("Handling GET request to retrieve location data.")
        return handle_get()

    else:
        logger.warning(f"Unsupported HTTP method. {event.get('routeKey')}")
        return {
            'statusCode': 405,
            'body': json.dumps('Method Not Allowed')
        }

def get_location_details(latitude, longitude):
    """Fetch location details using OpenStreetMap API"""
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?lat={latitude}&lon={longitude}&format=json"
        response = requests.get(url, headers={"User-Agent": "LambdaLocationService"})
        response.raise_for_status()
        data = response.json()

        # Extract useful location information
        address = data.get("address", {})
        return {
            "road": address.get("road", ""),
            "suburb": address.get("suburb", ""),
            "state": address.get("state", ""),
            "country": address.get("country", "Unknown")
        }
    except requests.RequestException as e:
        logger.error(f"Error fetching location data: {str(e)}")
        return {
            "road": "",
            "suburb": "",
            "state": "",
            "country": "Unknown"
        }

def handle_post(event):
    if 'body' not in event:
        logger.warning("Request does not contain a body.")
        return {'statusCode': 400, 'body': json.dumps('Invalid Request')}

    try:
        # Parse the incoming event body
        event_data = json.loads(event['body'])
        logger.info(f"Received event data: {event_data}")

        # Extract latitude, longitude, and message
        latitude = event_data.get('latitude')
        longitude = event_data.get('longitude')
        message = event_data.get('message', '')

        if not latitude or not longitude:
            logger.error("Missing 'latitude' or 'longitude'.")
            return {'statusCode': 400, 'body': json.dumps("Missing 'latitude' or 'longitude'.")}

        # Fetch location details
        location_details = get_location_details(latitude, longitude)
        current_time = int(datetime.datetime.now(tz=datetime.timezone.utc).timestamp())

        # Insert into DynamoDB
        logger.info(f"Saving location details to DynamoDB: {location_details}")
        client.put_item(
            TableName='dev-location-dynamodb',
            Item={
                'timestamp': {'N': str(current_time)},
                'latitude': {'N': str(latitude)},
                'longitude': {'N': str(longitude)},
                'message': {'S': message},
                'road': {'S': location_details['road']},
                'suburb': {'S': location_details['suburb']},
                'state': {'S': location_details['state']},
                'country': {'S': location_details['country']}
            }
        )

        return {'statusCode': 200, 'body': json.dumps('Location Saved Successfully')}

    except Exception as e:
        logger.error(f"Error while saving location data: {str(e)}")
        return {'statusCode': 500, 'body': json.dumps('Location Save Failed')}

def handle_get():
    try:
        logger.info("Fetching stored location data from DynamoDB.")

        response = client.scan(
            TableName='dev-location-dynamodb',
            ProjectionExpression='#timestamp, latitude, longitude, message, road, suburb, #state, #country',
            ExpressionAttributeNames = {'#timestamp':'timestamp','#state': 'state','#country':'country'}
        )
        print(response['Items'])
        # Extract the data
        locations = [
            {
                'timestamp': item.get('timestamp',{}).get('N'),
                'latitude': item.get('latitude', {}).get('N'),
                'longitude': item.get('longitude', {}).get('N'),
                'message': item.get('message', {}).get('S'),
                'road': item.get('road', {}).get('S'),
                'suburb': item.get('suburb', {}).get('S'),
                'state': item.get('state', {}).get('S'),
                'country': item.get('country', {}).get('S')
            }
            for item in response.get('Items', [])
        ]

        logger.info(f"Retrieved {len(locations)} location records.")
        return {'statusCode': 200, 'body': json.dumps(locations)}

    except Exception as e:
        logger.error(f"Error retrieving location data: {str(e)}")
        return {'statusCode': 500, 'body': json.dumps('Error retrieving location data')}


if __name__ == "__main__":
    post_event = {'body':{
        'latitude':0,
        'longitude':0,
        'message':''
    }}
    handle_post(json.dumps(post_event))