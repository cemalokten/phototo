'use strict';

const model = require('../db/model');

const sessionAuth = async (request, response, next) => {
  if (!request.signedCookies.sid) response.redirect('/');
  const user = await model.getSession(request.signedCookies.sid);
  if (user) request.session = user;
  next();
};

module.exports = sessionAuth;
