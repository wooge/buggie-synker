#!/usr/bin/env bash
# Script to run for outside triggers of update-library

# Read the first line of the request (the HTTP request line)
read request_line

# Example: "GET /myendpoint?token=SECRET123 HTTP/1.1"
echo "Received request: $request_line" >&2

# Check if the expected query parameter is set
required="secret=$SECRET_UPDATE_LIBRARY"
if [[ "$request_line" != *"$required"* ]]; then
    # Forwarding to dev/null, caller gets no response
    cat > /dev/null
    exit 0
fi

# Handling the call, updating library
echo "HTTP/1.1 200 OK"
echo "Content-Type: text/plain"
echo

# Preparing log files folder
mkdir -p /sync-service/log

# Initiating update-library
bash /scripts/utils/execute-locked-operation.sh "sync-service" /scripts/download/update-library.sh  > /sync-service/log/update-library-$(date +\%Y\%m\%d-\%H\%M\%S).log

echo "Updated libraries $(date '+%Y-%m-%d %H:%M:%S')"