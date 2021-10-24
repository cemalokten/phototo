'use strict';

const model = require('../db/model');

const deletePhoto = async (request, response) => {
  const id = await request.body;
  console.log(request.body);
  return model.deletePhoto(id.id).then(() => response.redirect('/profile'));
};

module.exports = { deletePhoto };
