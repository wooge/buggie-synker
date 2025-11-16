if [ $# -lt 2 ]; then
    echo "Usage: $0 <operation_name> <script_path> [args...]"
    exit 1
fi

OPERATION_NAME=$1
SCRIPT_PATH=$2

echo "Performing locked operation '$OPERATION_NAME': $SCRIPT_PATH ${@:3}"

LOCKFILE="./$OPERATION_NAME.lock"

# Check if lockfile exists and process is running
if [ -e "$LOCKFILE" ] && kill -0 $(cat "$LOCKFILE") 2>/dev/null; then
    echo "Operation already running."
    exit 1
fi

# Create lockfile with given operation name
echo $$ > "$LOCKFILE"
echo "Created lockfile at $LOCKFILE to prevent concurrent operations running"

# Performing the given operation
"$SCRIPT_PATH" "${@:3}"

# Remove lockfile
rm -f "$LOCKFILE"
echo "Removed lockfile at $LOCKFILE"