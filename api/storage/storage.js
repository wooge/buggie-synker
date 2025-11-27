import { Client } from "pg";

const client = new Client({
  host: "db",
  port: 5432,
  database: "buggie-synker",
  user: "buggie-synker",
  password: process.env.POSTGRES_PASSWORD,
});

client.connect();

export const getJobs = () => client.query("SELECT * FROM jobs");

export const getJob = (id) =>
  client.query("SELECT * FROM jobs WHERE id = $1", [id]);

export const createJob = ({ type, url, library, name }) =>
  client.query(
    "INSERT INTO jobs (type, url, library, name) VALUES ($1, $2, $3, $4) RETURNING *",
    [type, url, library, name]
  );

export const findJobByFields = ({ type, url, library, name }) =>
  client.query(
    `
      SELECT *
      FROM jobs
      WHERE type = $1
        AND url = $2
        AND library = $3
        AND name = $4
    `,
    [type, url, library, name]
  );

export const deleteJob = (id) =>
  client.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [id]);

export const updateJobRunTimestamp = (id) =>
  client.query(
    "UPDATE jobs SET run_timestamp = NOW() WHERE id = $1 RETURNING *",
    [id]
  );
