import express from "express";
import {
  createAlbum,
  deleteAlbum,
  findAlbumsByUrl,
  getAlbum,
  getAlbumLatestLog,
  getAlbums,
} from "../storage/music-storage.js";
import { scheduleAlbum } from "../tasks/scheduler.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const response = await getAlbums();

    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getAlbum(req.params.id);
    if (result.rows.length === 0) return res.status(404).end();

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:id/latest", async (req, res) => {
  try {
    const getAlbumResult = await getAlbum(req.params.id);
    if (getAlbumResult.rows.length === 0) return res.status(404).end();

    const album = getAlbumResult.rows[0];
    const timestamp = album.executed_at;

    if (!timestamp) return res.status(204).end();

    const timestampString = timestamp.toISOString();
    const result = getAlbumLatestLog(timestampString);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    const existingAlbumsResult = await findAlbumsByUrl(url);
    if (existingAlbumsResult.rows.length > 0) return res.status(409).end();

    const newAlbumBody = {
      url,
    };
    const newAlbumResult = await createAlbum(newAlbumBody);
    const newAlbum = newAlbumResult.rows[0];

    scheduleAlbum(newAlbum);

    res.json(newAlbum);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.post("/:id/enqueue", async (req, res) => {
  try {
    const getAlbumResult = await getAlbum(req.params.id);
    if (getAlbumResult.rows.length === 0) return res.status(404).end();

    const album = getAlbumResult.rows[0];

    const jobId = await scheduleAlbum(album);

    res.status(200).send(jobId);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteAlbum(req.params.id);

    if (result.rows.length === 0) return res.status(404).end();

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getAlbum(req.params.id);
    if (result.rows.length === 0) return res.status(404).end();

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

export default router;