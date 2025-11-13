PLAYLISTS_FILE=$1

echo "Downloading all playlists as specified in $PLAYLISTS_FILE"

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Use `read -r -a` + eval-style parsing to handle quotes
while IFS= read -r line; do
    # Skip empty lines and comments
    [[ -z "$line" || "$line" =~ ^# ]] && continue

    # Use eval to split respecting quotes
    eval "set -- $line"
    arg1=$1
    arg2=$2
    arg3=$3
	
	case "$arg1" in
        albums)
            "$CURRENT_DIR/download-playlist-album.sh" "$arg2" "$arg3"
            ;;
        *)		
            "$CURRENT_DIR/download-playlist.sh" "$arg1" "$arg2" "$arg3"
            ;;
    esac
	
done <<< "$(cat "$PLAYLISTS_FILE")"

echo "Finished downloading playlists as specified in $PLAYLISTS_FILE"