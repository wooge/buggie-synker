PLAYLISTS_FILE=$1

echo "Downloading all playlists as specified in $PLAYLISTS_FILE"

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

while read -r arg1 arg2 arg3; do
    # Skip empty lines or comments
    [[ -z "$arg1" || "$arg1" =~ ^# ]] && continue
	
    "$CURRENT_DIR/download-playlist.sh" "$arg1" "$arg2" "$arg3"
done <<< "$(cat "$PLAYLISTS_FILE")"

echo "Finished downloading playlists as specified in $PLAYLISTS_FILE"