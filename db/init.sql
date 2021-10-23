BEGIN;

DROP TABLE IF EXISTS users, sessions, photos CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    photo BYTEA NULL,
    user_id INTEGER REFERENCES users(id)
);

COMMIT;