import requests
import json

# Change this URL to match the one where your Flask app is running
API_URL = 'http://127.0.0.1:5000/predict'

# Sample input data
input_data = {'message': 'saya depresi'}

# Send a POST request
response = requests.post(API_URL, json=input_data)

# Check the response
try:
    result = response.json()
    print(f'Prediction: {result["prediction"]}')
except json.JSONDecodeError:
    print(f'Error: Invalid JSON received - {response.text}')
except KeyError:
    print(f'Error: "prediction" key not found in the response - {response.text}')
except Exception as e:
    print(f'Error: {e}')