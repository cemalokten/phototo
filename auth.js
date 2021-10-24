'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./db/model');
const func = require('./functions');

const verifyUser = async (email, password) => {
  const user = await model.getUser(email);
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Incorrect Password');
  delete user.password;
  return user;
};

const emailIsUnique = async (response, email) => {
  const user = await model.getUser(email);
  if (user) func.toggleError(response, '👀 Sign Up', 'error');
  return user;
};

const saveHashedPassword = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return model.createUser(email, hashedPassword, name);
};

const saveUserSession = (user) => {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, user);
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 1000 * 60000, // 60,000ms (60s)
  sameSite: 'lax',
  signed: true,
};

module.exports = {
  verifyUser,
  emailIsUnique,
  saveHashedPassword,
  saveUserSession,
  COOKIE_OPTIONS,
};
