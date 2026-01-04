import express from "express";
import {
  createAlbum,
  deleteAlbum,
  findAlbumsByUrl,
  getAlbum,
  getTimestampLogContents,
  getAlbums,
} from "../storage/music-storage.js";
import { getAlbumStatus, scheduleAlbum } from "../tasks/scheduler.js";

const router = express.Router();

const attachAlbumStatus = async (album) => {
  album.status = await getAlbumStatus(album.id);
};

router.get("/", async (_, res) => {
  try {
    const response = await getAlbums();

    const albums = response.rows;

    albums.sort((a, b) => b.id - a.id)

    for (const album of albums) {
      await attachAlbumStatus(album);
    }

    res.json(albums);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getAlbum(req.params.id);
    if (result.rows.length === 0) return res.status(404).end();

    const album = result.rows[0];

    await attachAlbumStatus(album);

    res.json(album);
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
    const result = getTimestampLogContents(timestampString);

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

    res.status(201).json(newAlbum);
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

    res.status(204).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

export default router;
