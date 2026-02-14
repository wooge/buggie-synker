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
