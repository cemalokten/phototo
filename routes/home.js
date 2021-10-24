'use strict';

const model = require('../db/model');

const get = async (request, response) => {
  try {
    if (!request.session) throw new Error('Please signup or login');
    const { id, name } = await request.session;
    const photos = await model.getPhotos(id);
    const photosHTML = await photos
      .map((photo) => {
        return `<img src="/user/${photo.user_id}/photo/${photo.id}" alt="" width="200" height="200">`;
      })
      .join('');
    const details = {
      title: 'Home',
      user: [name],
      id: [id],
      photos: photosHTML,
    };
    response.render('home', details);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { get };
