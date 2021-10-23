'use strict';

const db = require('./connection.js');

const createUser = (email, hashedPassword, name) => {
  const INSERT_USER = {
    text: `INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id email, name;`,
    values: [email, hashedPassword, name],
  };
  return db
    .query(INSERT_USER)
    .then((user) => user.rows[0])
    .catch((e) => console.log(e.stack));
};

const getUser = (email) => {
  const SELECT_USER = {
    text: `SELECT id, name, email, password FROM users WHERE email=$1;`,
    values: [email],
  };
  return db
    .query(SELECT_USER)
    .then((user) => user.rows[0])
    .catch((e) => console.log(e.stack));
};

const createSession = (sid, data) => {
  const INSERT_SESSION = {
    text: `INSERT INTO sessions (sid, data) VALUES ($1, $2) RETURNING sid`,
    values: [sid, data],
  };
  return db
    .query(INSERT_SESSION)
    .then((session) => session.rows[0].sid)
    .catch((e) => console.log(e.stack));
};

const getSession = (sid) => {
  const SELECT_SESSION = {
    text: `SELECT data FROM sessions WHERE sid=$1;`,
    values: [sid],
  };
  return db
    .query(SELECT_SESSION)
    .then((session) => session.rows[0].data)
    .catch((e) => console.log(e.stack));
};

const createImage = (photo, id) => {
  const INSERT_IMAGE = {
    text: `INSERT INTO photos (photo, user_id) VALUES ($1, $2)`,
    values: [photo, id],
  };
  return db.query(INSERT_IMAGE).then((image) => image.rows[0]);
};

function getImage(userID) {
  const SELECT_IMAGE = {
    text: `SELECT photo FROM photos WHERE id=$1`,
    values: [userID],
  };
  return db
    .query(SELECT_IMAGE)
    .then((result) => result.rows[0])
    .catch((e) => console.log(e.stack));
}

module.exports = {
  createUser,
  getUser,
  createSession,
  getSession,
  createImage,
  getImage,
};
