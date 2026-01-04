const REGEX_ALBUM_NAME =
  /\[youtube:tab\] Playlist Album - (?<name>.+): Downloading \d+ items of \d+/;

export const getAlbumNameFromOutput = (output) => {
  const match = output.match(REGEX_ALBUM_NAME);

  if (match?.groups?.name) {
    return match.groups.name;
  }

  return null;
};
