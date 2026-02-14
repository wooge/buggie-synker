PLAYLIST_NAME=$1
PLAYLIST_URL=$2

# Define M3U file path
M3U8_FILE="$DESTINATION_PATH/$PLAYLIST_NAME.m3u8"
TEMP_M3U8="$M3U8_FILE.temp"

echo "Building M3U8 playlist file for '$PLAYLIST_NAME'..."

(
    echo "#EXTM3U8"
	
	# Using yt-dlp to again, get all files in the playlist
	yt-dlp -i \
	--replace-in-metadata "artist" ", " ";" \
	--parse-metadata 'artist:(?P<path_artist>^[^;]+)' \
	--skip-download \
	--remote-components ejs:github \
	--print "$PLAYLIST_NAME/%(path_artist)s - %(title)s.mp3" \
	"$PLAYLIST_URL"
) > "$TEMP_M3U8"

# Move temp file to final destination once complete
mv "$TEMP_M3U8" "$M3U8_FILE"

echo "M3U8 playlist created at: $M3U8_FILE"