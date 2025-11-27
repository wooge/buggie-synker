import Queue from "bull";
import { updateJobRunTimestamp } from "../storage/storage.js";
import { downloadAlbum } from "./download.js";

const downloadQueue = new Queue("downloading", {
  redis: { host: "redis", port: 6379 },
});

downloadQueue.on("error", (err) => {
  console.log("Redis error occured", err);
});

downloadQueue.on("waiting", function (jobId) {
  console.log(`Job ${jobId} is waiting`);
});

downloadQueue.on("active", function (job) {
  console.log(`Job ${job.id} has started`);
});

downloadQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);

  updateJobRunTimestamp(job.data.id);
});

downloadQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

downloadQueue.process(function (job, done) {
  if (job.data.type == "album") {
    downloadAlbum(job.data.url, (returnCode) =>
      done(null, { outcome: returnCode })
    );
  } else {
    throw new Error(`Job type ${job.type} not recognized.`);
  }
});

export const isJobIdRunning = async (jobId) => {
  const delayedJobs = await downloadQueue.getDelayed();
  const waitingJobs = await downloadQueue.getWaiting();
  const activeJobs = await downloadQueue.getActive();

  return (
    delayedJobs.find((job) => job.data.id == jobId) !== undefined ||
    waitingJobs.find((job) => job.data.id == jobId) !== undefined ||
    activeJobs.find((job) => job.data.id == jobId) !== undefined
  );
};

export const scheduleDownload = async (params) => {
  const job = await downloadQueue.add(params);
  console.log(`Job ${job.id} has been enqueued`, params);
  return job.id;
};
