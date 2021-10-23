'use strict';

const model = require('../db/model');

const get = async (request, response) => {
  try {
    if (!request.signedCookies.sid) throw new Error('Please signup or login');
    const { email } = await model.getSession(request.signedCookies.sid);
    const { name } = await model.getUser(email);
    const details = { title: 'Home', user: [name] };
    response.render('home', details);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { get };
