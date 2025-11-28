import Queue from "bull";
import { updateAlbumRunTimestamp } from "../storage/storage.js";
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

albumQueue.on("completed", (job, result) => {
  console.log(`Album job ${job.id} completed with result:`, result);

  updateAlbumRunTimestamp(job.data.id);
});

albumQueue.on("failed", (job, err) => {
  console.error(`Album job ${job.id} failed with error:`, err);
});

albumQueue.process(function (job, done) {
  downloadAlbum(job.data.url, (returnCode) =>
    done(null, { outcome: returnCode })
  );
});

export const scheduleAlbum = async (params) => {
  const job = await albumQueue.add(params);
  console.log(`Album job ${job.id} has been enqueued`, params);
  return job.id;
};
