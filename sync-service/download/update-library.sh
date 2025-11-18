echo "Updating library"

# Overwriting PATH to ensure yt-dlp and similar tools can be found, even from cron shell
export PATH=/usr/local/bin:$PATH

PLAYLISTS_FILE=/scripts/playlists.txt

echo "Downloading all playlists as specified in $PLAYLISTS_FILE"

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
            /scripts/download/download-playlist-album.sh "$arg2" "/library/$arg3"
            ;;
        *)		
            /scripts/download/download-playlist.sh "$arg1" "$arg2" "/library/$arg3"
            ;;
    esac
	
done <<< "$(cat "$PLAYLISTS_FILE")"

echo "Finished downloading playlists as specified in $PLAYLISTS_FILE"

# Performing LMS server scan (regardless of if LMS is running)
/scripts/utils/scan-lms-server.sh