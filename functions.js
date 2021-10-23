'use strict';

const toggleError = (response, title, error) => {
  const errorClass = {
    title: [title],
    error: [error],
  };
  response.render('signup', errorClass);
};

module.exports = { toggleError };
