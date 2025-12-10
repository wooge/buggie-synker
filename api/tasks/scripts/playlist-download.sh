PLAYLIST_NAME=$1
PLAYLIST_URL=$2
DESTINATION_PATH=$3

# Paths
ARCHIVE_FILE="$DESTINATION_PATH/$PLAYLIST_NAME/downloaded.txt"

echo "Downloading playlist '$PLAYLIST_URL' to '$DESTINATION_PATH'"
echo "Archive file: '$ARCHIVE_FILE'"

# Run yt-dlp
yt-dlp -i \
	--replace-in-metadata "artist" ", " ";" \
	--parse-metadata "artist:(?P<path_artist>^[^;]+)" \
	--parse-metadata "$PLAYLIST_NAME :%(album)s" \
	--parse-metadata "Various Artists:%(album_artist)s" \
    -o "$DESTINATION_PATH/$PLAYLIST_NAME/%(path_artist)s - %(title)s.%(ext)s" \
    --download-archive "$ARCHIVE_FILE" \
    -f bestaudio \
	--cookies "/app/cookies/www.youtube.com_cookies.txt" \
	--remote-components ejs:github \
    --extract-audio \
    --audio-format mp3 \
    --audio-quality 0 \
    --embed-metadata \
    --add-metadata \
    --embed-thumbnail \
    "$PLAYLIST_URL"

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