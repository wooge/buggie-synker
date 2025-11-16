#!/bin/bash

# Entry point that starts automatic processes.

echo "Running sync-service"

# Cronjob triggering scheduled processes
cron -f &

# Start socat in the foreground, listening to outside triggers
socat TCP-LISTEN:8080,fork SYSTEM:"/scripts/update-library-listen.sh"