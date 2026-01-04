import { Client } from "pg";
import fs from "fs";
import { makeTimestampFilesafe } from "../utils/paths.js";

const client = new Client({
  host: "db",
  port: 5432,
  database: "buggie-synker",
  user: "buggie-synker",
  password: process.env.POSTGRES_PASSWORD,
});

client.connect();

/* SHARED */
export const getTimestampLogContents = (timestamp) => {
  const filesafeTimestamp = makeTimestampFilesafe(timestamp);
  const logFilePath = `/logs/${filesafeTimestamp}.log`;

  const fileContents = fs.readFileSync(logFilePath, "utf-8");
  const fileLines = fileContents.replace(/\r\n/g, "\n").split("\n");

  return fileLines;
};

/* ALBUMS */
export const getAlbums = () => client.query("SELECT * FROM albums");

export const getAlbum = (id) =>
  client.query("SELECT * FROM albums WHERE id = $1", [id]);

export const findAlbumsByUrl = (url) =>
  client.query(
    `
      SELECT *
      FROM albums
      WHERE url = $1
    `,
    [url]
  );

export const createAlbum = ({ url }) =>
  client.query(
    "INSERT INTO albums (url, created_at) VALUES ($1, NOW()) RETURNING *",
    [url]
  );

export const deleteAlbum = (id) =>
  client.query("DELETE FROM albums WHERE id = $1 RETURNING *", [id]);

export const updateAlbumAfterExecution = (id, timestamp, albumName) =>
  client.query(
    "UPDATE albums SET executed_at = $2, name = $3 WHERE id = $1 RETURNING *",
    [id, timestamp, albumName]
  );

/* PLAYLISTS */
export const getPlaylists = () => client.query("SELECT * FROM playlists");

export const getPlaylist = (id) =>
  client.query("SELECT * FROM playlists WHERE id = $1", [id]);

export const findUserPlaylistByUrl = (username, url) =>
  client.query(
    `
      SELECT *
      FROM playlists
      WHERE owner = $1
      AND url = $2
    `,
    [username, url]
  );

export const createPlaylist = ({ url, name, owner }) =>
  client.query(
    "INSERT INTO playlists (url, name, owner, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [url, name, owner]
  );

export const deletePlaylist = (id) =>
  client.query("DELETE FROM playlists WHERE id = $1 RETURNING *", [id]);

export const updatePlaylistRunTimestamp = (id, timestamp) =>
  client.query(
    "UPDATE playlists SET executed_at = $2 WHERE id = $1 RETURNING *",
    [id, timestamp]
  );
