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
            if not session_id:
                logger.error("No 'session_id' found in the event data.")
                return {
                    'statusCode': 400,
                    'body': json.dumps("Missing session_id.")
                }

            # Get the other location-related data from the event
            ipv4 = event_data.get('IPv4', '')
            city = event_data.get('city', '')
            country_code = event_data.get('country_code', '')
            country_name = event_data.get('country_name', '')
            latitude = event_data.get('latitude', 0)
            longitude = event_data.get('longitude', 0)
            postal = event_data.get('postal', '')
            state = event_data.get('state', '')

            # Insert the full location data into the DynamoDB table
            logger.info(f"Attempting to save session_id: {session_id} and location data to DynamoDB.")
            response = client.put_item(
                TableName='dev-location-dynamodb',
                Item={
                    'session_id': {
                        'S': session_id
                    },
                    'IPv4': {
                        'S': ipv4
                    },
                    'city': {
                        'S': city
                    },
                    'country_code': {
                        'S': country_code
                    },
                    'country_name': {
                        'S': country_name
                    },
                    'latitude': {
                        'N': str(latitude)  # DynamoDB expects numbers as strings
                    },
                    'longitude': {
                        'N': str(longitude)  # DynamoDB expects numbers as strings
                    },
                    'postal': {
                        'S': postal
                    },
                    'state': {
                        'S': state
                    }
                }
            )

            logger.info(f"Successfully saved session_id: {session_id} and location data to DynamoDB.")
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
            ProjectionExpression='latitude, longitude'  # Only retrieve latitude and longitude
        )

        # Extract the latitude and longitude data from the response
        location_data = response.get('Items', [])
        latitudes_longitudes = [
            {
                'latitude': item.get('latitude', {}).get('N'),
                'longitude': item.get('longitude', {}).get('N')
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
