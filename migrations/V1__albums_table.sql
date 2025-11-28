CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  executed_at TIMESTAMP
);