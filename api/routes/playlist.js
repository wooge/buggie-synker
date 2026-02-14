import express from "express";
import {
  createPlaylist,
  deletePlaylist,
  findUserPlaylistByUrl,
  getPlaylist,
  getTimestampLogContents,
  getPlaylists,
} from "../storage/music-storage.js";
import { schedulePlaylist, getPlaylistStatus } from "../tasks/scheduler.js";

const router = express.Router();

const attachPlaylistStatus = async (playlist) => {
  playlist.status = await getPlaylistStatus(playlist.id);
};

router.get("/", async (_, res) => {
  try {
    const response = await getPlaylists();

    const playlists = response.rows;

    playlists.sort((a, b) => b.id - a.id);

    for (const playlist of playlists) {
      await attachPlaylistStatus(playlist);
    }

    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getPlaylist(req.params.id);
    if (result.rows.length === 0) return res.status(404).end();

    const playlist = result.rows[0];

    await attachPlaylistStatus(playlist);

    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:id/latest", async (req, res) => {
  try {
    const getPlaylistResult = await getPlaylist(req.params.id);
    if (getPlaylistResult.rows.length === 0) return res.status(404).end();

    const playlist = getPlaylistResult.rows[0];
    const timestamp = playlist.executed_at;

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
    const { name, url } = req.body;

    const nameIsValid = /^[\w\- ]+$/.test(name);
    if (!nameIsValid) {
      return res.status(400).json({
        error:
          "Invalid playlist name. Allowed characters: letters, numbers, spaces, underscores, hyphens.",
      });
    }

    const username = req.get("X-Forwarded-User");

    const existingPlaylistsResult = await findUserPlaylistByUrl(username, url);
    if (existingPlaylistsResult.rows.length > 0) return res.status(409).end();

    const newPlaylistBody = {
      url,
      name,
      owner: username,
    };
    const newPlaylistResult = await createPlaylist(newPlaylistBody);
    const newPlaylist = newPlaylistResult.rows[0];

    schedulePlaylist(newPlaylist);

    res.json(newPlaylist);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.post("/:id/enqueue", async (req, res) => {
  try {
    const getPlaylistResult = await getPlaylist(req.params.id);
    if (getPlaylistResult.rows.length === 0) return res.status(404).end();

    const playlist = getPlaylistResult.rows[0];

    const jobId = await schedulePlaylist(playlist);

    res.status(200).send(jobId);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deletePlaylist(req.params.id);

    if (result.rows.length === 0) return res.status(404).end();

    res.status(204).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

export default router;
