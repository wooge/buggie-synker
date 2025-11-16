PLAYLIST_URL=$1
DESTINATION_PATH=$2

# Paths
ARCHIVE_FILE="$DESTINATION_PATH/downloaded.txt"

echo "Downloading albums from playlist '$PLAYLIST_URL' to target '$DESTINATION_PATH'"
echo "Archive file: '$ARCHIVE_FILE'"

# Run yt-dlp
yt-dlp -i \
	--replace-in-metadata "artist" ", " ";" \
	--parse-metadata 'artist:(?P<album_artist>^[^;]+)' \
	--parse-metadata "playlist_index:%(track_number)s" \
    -o "$DESTINATION_PATH/%(album_artist)s/%(album)s/%(title)s.%(ext)s" \
    --download-archive "$ARCHIVE_FILE" \
    -f bestaudio \
    --remote-components ejs:github \
    --extract-audio \
    --audio-format mp3 \
    --audio-quality 0 \
    --embed-metadata \
    --add-metadata \
    --embed-thumbnail \
    "$PLAYLIST_URL"