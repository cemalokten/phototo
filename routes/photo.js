'use strict';

const model = require('../db/model');

const get = async (request, response) => {
  const photo = await model.getPhoto(request.params.id, request.params.photoid);
  response.send(photo);
};

const post = async (request, response) => {
  const { id } = request.session;
  const file = request.file;
  await model.createImage(file.buffer, id);
  response.redirect('/home');
};

module.exports = { get, post };
