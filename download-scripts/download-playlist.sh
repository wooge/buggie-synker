PLAYLIST_NAME=$1
PLAYLIST_URL=$2
DESTINATION_PATH=$3

# Paths
ARCHIVE_FILE="$DESTINATION_PATH/$PLAYLIST_NAME/downloaded.txt"

echo "Downloading playlist '$PLAYLIST_URL' to target '$DESTINATION_PATH'"
echo "Archive file: '$ARCHIVE_FILE'"

# The work leading to the regex renaming of file...
#--exec 'bash -c "echo \"$0\" | sed '\''s/[^A-Za-z0-9._ -/\:]/_/g'\''" {}' \
#--exec 'bash -c "safe_path=\"$0\"; mv \"$0\" \"$safe_path\".mpx" {}' \
#--exec 'bash -c "safe_path=$(echo \"$0\" | sed '\''s/[^A-Za-z0-9._ -/\:]/_/g'\'' ); mv \"$0\" \"$safe_path\"" {}' \

# Run yt-dlp
yt-dlp -i \
	--replace-in-metadata "artist" ", " ";" \
	--replace-in-metadata "album" "." "" \
	--parse-metadata 'artist:(?P<album_artist>^[^;]+)' \
    -o "$DESTINATION_PATH/$PLAYLIST_NAME/%(album_artist)s - %(title)s.%(ext)s" \
	--exec 'bash -c "safe_path=$(echo \"$0\" | sed '\''s/[^A-Za-z0-9._ -/\:]/_/g'\'' ); mv \"$0\" \"$safe_path\"" {}' \
    --download-archive "$ARCHIVE_FILE" \
    -f bestaudio \
    --extract-audio \
    --audio-format mp3 \
    --audio-quality 0 \
    --embed-metadata \
    --add-metadata \
    --embed-thumbnail \
    "$PLAYLIST_URL"
	
# Sanitize playlist name for filename
SAFE_PLAYLIST_NAME=$(echo "$PLAYLIST_NAME" | tr '/\\:*?"<>|' '_')

# Define M3U file path
M3U_FILE="$DESTINATION_PATH/$SAFE_PLAYLIST_NAME.m3u"
TEMP_M3U="$M3U_FILE.temp"

echo "Building M3U playlist file for '$PLAYLIST_NAME'..."

(
    echo "#EXTM3U"
	
	# Using yt-dlp to again, get all files in the playlist
	yt-dlp -i \
	--replace-in-metadata "artist" ", " ";" \
	--replace-in-metadata "album" "." "" \
	--parse-metadata 'artist:(?P<album_artist>^[^;]+)' \
	--replace-in-metadata "album_artist" "[^a-zA-Z0-9._ -()]" "_" \
	--replace-in-metadata "title" "[^a-zA-Z0-9._ -()]" "_" \
	--skip-download \
	--print "$PLAYLIST_NAME/%(album_artist)s - %(title)s.mp3" \
	"$PLAYLIST_URL"
) > "$TEMP_M3U"

# Move temp file to final destination once complete
mv "$TEMP_M3U" "$M3U_FILE"

echo "M3U playlist created at: $M3U_FILE"