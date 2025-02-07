import json
import boto3
import logging

# Set up the logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)  # You can set this to DEBUG or ERROR as needed

# Initialize DynamoDB client
client = boto3.client('dynamodb')

def lambda_handler(event, context):
    logger.info("Lambda function has been invoked.")  # Log when the function is triggered
    
    # Check for the HTTP method (POST or GET)
    if event.get('routeKey') == 'POST /location':  # Handling POST requests
        logger.info("Handling POST request to save location data.")
        return handle_post(event)

    elif event.get('routeKey') == 'GET /location':  # Handling GET requests
        logger.info("Handling GET request to retrieve latitude and longitude data.")
        return handle_get()

    else:
        logger.warning(f"Unsupported HTTP method. {event.get('httpMethod')}")
        return {
            'statusCode': 405,
            'body': json.dumps('Method Not Allowed')
        }

def handle_post(event):
    if 'body' in event:
        try:
            # Parse the incoming event body
            event_data = json.loads(event['body'])
            logger.info(f"Received event data: {event_data}")

            # Get the session_id from the event data
            session_id = event_data.get('session_id')
            latitude = event_data.get('latitude')
            longitude = event_data.get('longitude')
            if not latitude or not longitude:
                logger.error("No 'latitude' or 'longitude' found in the event data.")
                return {
                    'statusCode': 400,
                    'body': json.dumps("Missing 'latitude' or 'longitude'.")
                }

            message = event_data.get('message', '')

            # Insert the full location data into DynamoDB, using latitude and longitude as the primary key
            logger.info(f"Attempting to save session_id: {session_id} and location data to DynamoDB.")
            response = client.put_item(
                TableName='dev-location-dynamodb',
                Item={
                    'latitude': {
                        'N': str(latitude)  # Latitude as the partition key
                    },
                    'longitude': {
                        'N': str(longitude)  # Longitude as the sort key
                    },
                    'message': {
                        'S': message
                    }
                }
            )

            logger.info(f"Successfully saved location data to DynamoDB.")
            return {
                'statusCode': 200,
                'body': json.dumps('Location Saved Successfully')
            }

        except Exception as e:
            logger.error(f"Error occurred while saving location data: {str(e)}")
            return {
                'statusCode': 500,
                'body': json.dumps('Location Save Failed')
            }

    else:
        logger.warning("Request does not contain a body.")
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid Request')
        }

def handle_get():
    try:
        # Scan the DynamoDB table to get all latitudes and longitudes
        logger.info("Scanning DynamoDB table to retrieve latitude and longitude.")

        response = client.scan(
            TableName='dev-location-dynamodb',
            ProjectionExpression='latitude, longitude, message'
        )

        # Extract the latitude and longitude data from the response
        location_data = response.get('Items', [])
        latitudes_longitudes = [
            {
                'latitude': item.get('latitude', {}).get('N'),
                'longitude': item.get('longitude', {}).get('N'),
                'message': item.get('message',{}).get('S')
            }
            for item in location_data
        ]

        logger.info(f"Retrieved {len(latitudes_longitudes)} latitude/longitude records.")
        return {
            'statusCode': 200,
            'body': json.dumps(latitudes_longitudes)
        }

    except Exception as e:
        logger.error(f"Error occurred while retrieving location data: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps('Error retrieving location data')
        }
