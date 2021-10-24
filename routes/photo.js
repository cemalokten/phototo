'use strict';

const model = require('../db/model');

const get = async (request, response) => {
  const photo = await model.getPhoto(request.params.id, request.params.photoid);
  response.send(photo);
};

module.exports = { get };
