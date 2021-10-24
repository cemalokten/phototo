'use strict';

const model = require('../db/model');

const get = async (request, response) => {
  try {
    if (!request.session) response.redirect('/');
    const { id, name } = await request.session;
    const photos = await model.getAllPhotos();
    const photosHTML = await photos
      .map((photo) => {
        return `<img src="/user/${photo.user_id}/photo/${photo.id}">
        @${photo.name.toLowerCase()}`;
      })
      .join('');
    const details = {
      title: 'Home',
      user: [name.toLowerCase()],
      id: [id],
      photos: photosHTML,
    };
    response.render('home', details);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { get };
