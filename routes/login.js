'use strict';

const authenticate = require('../auth');

const get = (request, response) => {
  const details = { title: 'Login' };
  response.render('login', details);
};

const post = (request, response) => {
  const { email, password } = request.body;
  authenticate
    .verifyUser(email, password)
    .then((user) => authenticate.saveUserSession(user))
    .then((sid) => response.cookie('sid', sid, authenticate.COOKIE_OPTIONS))
    .then(() => response.redirect('/home'))
    .catch((e) => console.error(e.stack));
};

module.exports = { get, post };
