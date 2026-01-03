import Queue from "bull";
import {
  updateAlbumRunTimestamp,
  updatePlaylistRunTimestamp,
} from "../storage/music-storage.js";
import { downloadAlbum, downloadPlaylist } from "./download.js";

const albumQueue = new Queue("albums", {
  redis: { host: "redis", port: 6379 },
});

albumQueue.on("error", (err) => {
  console.log("Album queue error occured", err);
});

albumQueue.on("waiting", function (jobId) {
  console.log(`Album job ${jobId} is waiting`);
});

albumQueue.on("active", function (job) {
  console.log(`Album job ${job.id} has started`);
});

albumQueue.on("failed", (job, err) => {
  console.error(`Album job ${job.id} failed with error:`, err);
});

albumQueue.on("completed", (job, timestamp) => {
  console.log(`Album job ${job.id} completed at`, timestamp);

  updateAlbumRunTimestamp(job.data.id, timestamp);
});

albumQueue.process("download-album", function (job, done) {
  downloadAlbum(job.data.url, (timestamp) => done(null, timestamp));
});

const playlistQueue = new Queue("playlists", {
  redis: { host: "redis", port: 6379 },
});

playlistQueue.on("error", (err) => {
  console.log("Playlist queue error occured", err);
});

playlistQueue.on("waiting", function (jobId) {
  console.log(`Playlist job ${jobId} is waiting`);
});

playlistQueue.on("active", function (job) {
  console.log(`Playlist job ${job.id} has started`);
});

playlistQueue.on("failed", (job, err) => {
  console.error(`Playlist job ${job.id} failed with error:`, err);
});

playlistQueue.on("completed", (job, timestamp) => {
  console.log(`Playlist job ${job.id} completed at`, timestamp);

  updatePlaylistRunTimestamp(job.data.id, timestamp);
});

playlistQueue.process("download-playlist", function (job, done) {
  const playlist = job.data;

  downloadPlaylist(playlist.owner, playlist.name, playlist.url, (timestamp) =>
    done(null, timestamp)
  );
});

export const scheduleAlbum = async (album) => {
  const job = await albumQueue.add("download-album", album, {
    jobId: album.id,
    removeOnComplete: true,
  });
  console.log(`Album job ${job.id} has been enqueued`, album);
  return job.id;
};

export const getAlbumStatus = async (albumId) => {
  const matchingJob = await albumQueue.getJob(albumId);
  if (!matchingJob) return "ready";

  const matchingJobState = await matchingJob.getState();

  return matchingJobState;
};

export const schedulePlaylist = async (playlist) => {
  const job = await playlistQueue.add("download-playlist", playlist, {
    jobId: playlist.id,
    removeOnComplete: true,
  });
  console.log(`Playlist job ${job.id} has been enqueued`, playlist);
  return job.id;
};
