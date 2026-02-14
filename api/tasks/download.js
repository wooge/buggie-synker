import { spawn } from "child_process";
import fs from "fs";
import { makeTimestampFilesafe } from "../utils/paths.js";
import { getAlbumNameFromOutput } from "../utils/reader.js"

export const downloadAlbumAsync = async (url) => {
  const timestamp = new Date().toISOString();
  const destinationPath = `/library/albums`;
  const args = [url, destinationPath];

  const output = await executeLoggedScriptAsync(
    "/app/tasks/scripts/album-download.sh",
    args,
    timestamp
  );

  const albumName = getAlbumNameFromOutput(output);

  scanMusicServer();

  return { albumName, timestamp };
};

export const downloadPlaylistAsync = async (username, playlistName, url) => {
  const timestamp = new Date().toISOString();
  const destinationPath = `/library/${username}`;
  const downloadArgs = [playlistName, url, destinationPath];
  const buildIndexArgs = [playlistName, url];

  await executeLoggedScriptAsync(
    "/app/tasks/scripts/playlist-download.sh",
    downloadArgs,
    timestamp
  );

  await executeLoggedScriptAsync(
    "/app/tasks/scripts/playlist-build-index.sh",
    buildIndexArgs,
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

  let output = "";

  return new Promise((resolve, reject) => {
    const process = spawn(scriptPath, args);

    process.stdout.on("data", (data) => {
      out.write(data);

      const text = data.toString();
      console.log(text);
      output += text;
    });

    process.stderr.on("data", (data) => {
      out.write(data);

      const text = data.toString();
      console.error(text);
      output += text;
    });

    process.on("close", (code) => {
      out.end();
      console.log(`${scriptPath} process exited with code ${code}`);

      if (code === 0) {
        resolve(output);
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
