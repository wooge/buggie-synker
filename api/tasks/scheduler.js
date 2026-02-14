import Queue from "bull";
import {
  updateAlbumAfterExecution,
  updatePlaylistRunTimestamp,
} from "../storage/music-storage.js";
import { downloadAlbumAsync, downloadPlaylistAsync } from "./download.js";

const jobQueue = new Queue("job", {
  redis: { host: "redis", port: 6379 },
});

jobQueue.on("error", (err) => {
  console.log("Queue error occured", err);
});

jobQueue.on("waiting", function (jobId) {
  console.log(`Job ${jobId} is waiting`);
});

jobQueue.on("active", function (job) {
  console.log(`Job ${job.id} has started`);
});

jobQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

jobQueue.on("completed", (job, data) => {
  if (job.name === "download-album") {
    const { albumName, timestamp } = data;
    updateAlbumAfterExecution(job.data.id, timestamp, albumName);

    console.log(`Album job ${job.id} completed at`, timestamp);
  } else if (job.name === "download-playlist") {
    const timestamp = data;
    updatePlaylistRunTimestamp(job.data.id, timestamp);

    console.log(`Playlist job ${job.id} completed at`, timestamp);
  }
});

jobQueue.process("download-album", async (job) => {
  return await downloadAlbumAsync(job.data.url);
});

jobQueue.process("download-playlist", async (job) => {
  const playlist = job.data;
  return await downloadPlaylistAsync(
    playlist.owner,
    playlist.name,
    playlist.url,
  );
});

export const scheduleAlbum = async (album) => {
  const existingJob = await jobQueue.getJob(album.id);
  if (existingJob) await existingJob.remove();

  const job = await jobQueue.add("download-album", album, {
    jobId: album.id,
    removeOnComplete: true,
  });
  console.log(`Album job ${job.id} has been enqueued`, album);
  return job.id;
};

export const getAlbumStatus = async (albumId) => {
  const matchingJob = await jobQueue.getJob(albumId);
  if (!matchingJob) return "ready";

  const matchingJobState = await matchingJob.getState();

  return matchingJobState;
};

export const schedulePlaylist = async (playlist) => {
  const existingJob = await jobQueue.getJob(playlist.id);
  if (existingJob) await existingJob.remove();

  const job = await jobQueue.add("download-playlist", playlist, {
    jobId: playlist.id,
    removeOnComplete: true,
  });
  console.log(`Playlist job ${job.id} has been enqueued`, playlist);
  return job.id;
};

export const getPlaylistStatus = async (playlistId) => {
  const matchingJob = await jobQueue.getJob(playlistId);
  if (!matchingJob) return "ready";

  const matchingJobState = await matchingJob.getState();

  return matchingJobState;
};
