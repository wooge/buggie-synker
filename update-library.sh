echo "Updating library"

cd "$(dirname "$0")"

LOCKFILE=$(realpath ./buggie-synker.lock)

# Check if lockfile exists and process is running
if [ -e "$LOCKFILE" ] && kill -0 $(cat "$LOCKFILE") 2>/dev/null; then
    echo "Script already running."
    exit 1
fi

# Create lockfile with current PID
echo $$ > "$LOCKFILE"
echo "Created lockfile at $LOCKFILE to prevent concurrent scripts running"

PLAYLISTS_FILE=$(realpath ./config/playlists.txt)

./download-scripts/download-all.sh "$PLAYLISTS_FILE"

# Remove lockfile
rm -f "$LOCKFILE"
echo "Removed lockfile at $LOCKFILE"