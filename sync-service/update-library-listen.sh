# Script to run for outside triggers of update-library

echo "HTTP/1.1 200 OK"
echo "Content-Type: text/plain"
echo

# Preparing log files folder
mkdir -p /library/log/sync-service

# Initiating update-library
bash /scripts/utils/execute-locked-operation.sh "sync-service" /scripts/download/update-library.sh  > /library/log/sync-service/update-library-$(date +\%Y\%m\%d-\%H\%M\%S).log

echo "Updated libraries $(date '+%Y-%m-%d %H:%M:%S')"