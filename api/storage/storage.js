import { Client } from "pg";

const client = new Client({
  host: "db",
  port: 5432,
  database: "buggie-synker",
  user: "buggie-synker",
  password: process.env.POSTGRES_PASSWORD,
});

client.connect();

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

export const updateAlbumRunTimestamp = (id) =>
  client.query(
    "UPDATE albums SET executed_at = NOW() WHERE id = $1 RETURNING *",
    [id]
  );
