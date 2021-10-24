'use strict';

const { deleteSession } = require('../db/model.js');

function post(request, response) {
  const sid = request.signedCookies.sid;
  deleteSession(sid).then(() => {
    response.clearCookie('sid');
    response.redirect('/');
  });
}

module.exports = { post };
