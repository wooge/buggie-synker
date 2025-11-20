#!/bin/bash

# Entry point that starts automatic processes.

echo "Running sync-service"

# Cronjob triggering scheduled processes
cron -f &

# Fixing line-endings in playlists.txt
tmpfile=$(mktemp)
tr -d '\r' < /playlists.txt > "$tmpfile"
cat "$tmpfile" > /playlists.txt
rm "$tmpfile"

# Start socat in the foreground, listening to outside triggers
socat TCP-LISTEN:8080,fork SYSTEM:"/scripts/update-library-listen.sh"