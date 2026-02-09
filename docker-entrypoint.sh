#!/bin/sh
set -e

# Fix permissions for mounted volumes if running as root
if [ "$(id -u)" = "0" ]; then
    # Ensure db and logs directories exist and have correct permissions
    mkdir -p /app/db /app/logs
    chown -R node:node /app/db /app/logs
    
    # Re-run as node user
    exec su-exec node "$@"
else
    exec "$@"
fi
