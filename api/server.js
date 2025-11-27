import express from "express";
import {
  createJob,
  getJobs,
  getJob,
  findJobByFields,
  deleteJob,
} from "./storage/storage.js";
import { isJobIdRunning, scheduleDownload } from "./tasks/scheduler.js";

const app = express();

// JSON parser middleware
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/job", async (_, res) => {
  try {
    const response = await getJobs();

    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

app.get("/job/:id", async (req, res) => {
  try {
    const result = await getJob(req.params.id);

    if (result.rows.length === 0) return res.status(404).end();

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

app.post("/job", async (req, res) => {
  try {
    const { type, url, library, name } = req.body;

    const newJobBody = {
      type,
      url,
      library,
      name,
    };

    const existingJobResult = await findJobByFields(newJobBody);

    if (existingJobResult.rows.length > 0) {
      return res.status(409).end();
    }

    const newJob = await createJob(newJobBody);

    res.json(newJob.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

app.delete("/job/:id", async (req, res) => {
  try {
    const result = await deleteJob(req.params.id);

    if (result.rows.length === 0) return res.status(404).end();

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

app.post("/job/:id/enqueue", async (req, res) => {
  try {
    const jobAlreadyRunning = await isJobIdRunning(req.params.id);
    if (jobAlreadyRunning) return res.status(409).end();

    const result = await getJob(req.params.id);
    if (result.rows.length === 0) return res.status(404).end();

    const job = result.rows[0];

    const jobId = await scheduleDownload(job);

    res.status(200).send(jobId);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});
