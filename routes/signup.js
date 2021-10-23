'use strict';

const authenticate = require('../auth');

const get = (request, response) => {
  const details = { title: '👀 Sign Up', error: 'none' };
  response.render('signup', details);
};

const post = (request, response) => {
  const { name, email, password } = request.body;
  authenticate
    .emailIsUnique(response, email)
    .then(authenticate.saveHashedPassword(email, password, name))
    .then(() => response.redirect('/'))
    .catch((error) => console.error(error));
};

module.exports = { get, post };
