# Script to run for outside triggers of update-library

echo "HTTP/1.1 200 OK"
echo "Content-Type: text/plain"
echo

# Preparing log files folder
mkdir -p /sync-service/log

# Initiating update-library
bash /scripts/utils/execute-locked-operation.sh "sync-service" /scripts/download/update-library.sh  > /sync-service/log/update-library-$(date +\%Y\%m\%d-\%H\%M\%S).log

echo "Updated libraries $(date '+%Y-%m-%d %H:%M:%S')"