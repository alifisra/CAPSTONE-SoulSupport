import requests

# Define the URL
url = "http://127.0.0.1:5000/predict"

# Define the data (in this case, a message in JSON format)
data = {"message": "Hello, chatbot!"}

# Send the POST request
response = requests.post(url, json=data)

# Print the response
print(response.json())
