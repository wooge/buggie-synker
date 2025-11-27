import { spawn } from "child_process";

export const downloadAlbum = (url, closeCallback) => {
  const outputPath =
    "/library/albums/%(album_artist)s/%(album)s/%(title)s.%(ext)s";
  const archiveFilePath = "/library/albums/downloaded.txt";

  const args = [
    "-i",
    "--replace-in-metadata",
    "artist",
    ", ",
    ";",
    "--parse-metadata",
    "artist:(?P<album_artist>^[^;]+)",
    "--parse-metadata",
    "playlist_index:%(track_number)s",
    "-o",
    outputPath,
    "--download-archive",
    archiveFilePath,
    "-f",
    "bestaudio",
    "--remote-components",
    "ejs:github",
    "--extract-audio",
    "--audio-format",
    "mp3",
    "--audio-quality",
    "0",
    "--embed-metadata",
    "--add-metadata",
    "--embed-thumbnail",
    url,
  ];

  performCommand("yt-dlp", args, closeCallback);
};

const performCommand = (cmd, args, closeCallback) => {
  const process = spawn(cmd, args);

  process.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`Error with command ${cmd} during: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`${cmd} process exited with code ${code}`);
    closeCallback(code);
  });
};
