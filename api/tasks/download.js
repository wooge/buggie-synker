import { spawn } from "child_process";
import fs from "fs";
import { makeTimestampFilesafe } from "../utils/paths.js";

export const downloadAlbumAsync = async (url) => {
  const timestamp = new Date().toISOString();
  const destinationPath = `/library/albums`;
  const args = [url, destinationPath];

  await executeLoggedScriptAsync(
    "/app/tasks/scripts/album-download.sh",
    args,
    timestamp
  );

  scanMusicServer();

  return timestamp;
};

export const downloadPlaylistAsync = async (username, playlistName, url) => {
  const timestamp = new Date().toISOString();
  const destinationPath = `/library/${username}`;
  const args = [playlistName, url, destinationPath];

  await executeLoggedScriptAsync(
    "/app/tasks/scripts/playlist-download.sh",
    args,
    timestamp
  );

  scanMusicServer();

  return timestamp;
};

const scanMusicServer = () => {
  const lmsApiKey = process.env.LMS_API_KEY;
  const lmsApiVersion = process.env.LMS_API_VERSION;

  performConsoleCommand("curl", [
    "-s",
    `http://host.docker.internal:4533/rest/startScan?apiKey=${lmsApiKey}&c=sync-service&v=${lmsApiVersion}`,
  ]);
};

const executeLoggedScriptAsync = (scriptPath, args, timestamp) => {
  const filesafeTimestamp = makeTimestampFilesafe(timestamp);
  const logFilePath = `/logs/${filesafeTimestamp}.log`;

  const out = fs.createWriteStream(logFilePath, { flags: "a" });

  return new Promise((resolve, reject) => {
    const process = spawn(scriptPath, args);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
      out.write(data);
    });

    process.stderr.on("data", (data) => {
      console.error(data.toString());
      out.write(data);
    });

    process.on("close", (code) => {
      out.end();
      console.log(`${scriptPath} process exited with code ${code}`);

      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command executed with code ${code}`));
      }
    });
  });
};

const performConsoleCommand = (cmd, args) => {
  const process = spawn(cmd, args);

  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  process.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  process.on("close", (code) => {
    console.log(`${cmd} process exited with code ${code}`);
  });
};
