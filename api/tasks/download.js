import { spawn } from "child_process";
import fs from "fs";
import { makeTimestampFilesafe } from "../utils/paths.js";

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
  const timestamp = new Date().toISOString();
  const filesafeTimestamp = makeTimestampFilesafe(timestamp);
  const logFilePath = `/logs/${filesafeTimestamp}.log`;

  const out = fs.openSync(logFilePath, "a");
  const process = spawn(cmd, args, {
    stdio: ["ignore", out, out], // stdin, stdout, stderr
  });

  process.on("close", (code) => {
    fs.closeSync(out);
    console.log(`${cmd} process exited with code ${code}`);
    closeCallback(timestamp);
  });
};
