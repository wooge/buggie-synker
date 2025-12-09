import Queue from "bull";
import { updateAlbumRunTimestamp } from "../storage/music-storage.js";
import { downloadAlbum } from "./download.js";

const albumQueue = new Queue("albums", {
  redis: { host: "redis", port: 6379 },
});

albumQueue.on("error", (err) => {
  console.log("Albumqueue error occured", err);
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

albumQueue.process(function (job, done) {
  downloadAlbum(job.data.url, (timestamp) => done(null, timestamp));
});

export const scheduleAlbum = async (album) => {
  const job = await albumQueue.add(album);
  console.log(`Album job ${job.id} has been enqueued`, album);
  return job.id;
};
