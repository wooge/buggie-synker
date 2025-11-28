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

  performLoggedCommand("yt-dlp", args, (timestamp) => {
    scanMusicServer();
    closeCallback(timestamp);
  });
};

const scanMusicServer = () => {
  const lmsApiKey = process.env.LMS_API_KEY;
  const lmsApiVersion = process.env.LMS_API_VERSION;

  performConsoleCommand("curl", [
    "-s",
    `http://host.docker.internal:4533/rest/startScan?apiKey=${lmsApiKey}&c=sync-service&v=${lmsApiVersion}`,
  ]);
};

const performLoggedCommand = (cmd, args, timestampCallback) => {
  const timestamp = new Date().toISOString();
  const filesafeTimestamp = makeTimestampFilesafe(timestamp);
  const logFilePath = `/logs/${filesafeTimestamp}.log`;

  const out = fs.createWriteStream(logFilePath, { flags: "a" });
  const process = spawn(cmd, args);

  process.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
    out.write(data); 
  });

  process.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    out.write(data); 
  });

  process.on("close", (code) => {
    out.end();
    console.log(`${cmd} process exited with code ${code}`);
    timestampCallback(timestamp);
  });
};

const performConsoleCommand = (cmd, args) => {
  const process = spawn(cmd, args);

  process.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`${cmd} process exited with code ${code}`);
  });
};
