'use strict';

const model = require('../db/model');

const get = async (request, response) => {
  try {
    if (!request.session) throw new Error('Please signup or login');
    const { id, name } = request.session;
    const photos = await model.getImage();
    const details = { title: 'Home', user: [name], photos: [photos], id: [id] };
    response.render('home', details);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { get };
