CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  executed_at TIMESTAMP
);