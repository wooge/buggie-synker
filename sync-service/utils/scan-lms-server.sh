echo "Requesting LMS server scan..."
response=$(curl -s "http://host.docker.internal:4533/rest/startScan?apiKey=$LMS_API_KEY&c=sync-service&v=$LMS_API_VERSION")
echo "Response: $response"