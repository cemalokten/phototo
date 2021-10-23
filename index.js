'use strict';

// Imports express (web framework for Node.js)
const express = require('express');
const multer = require('multer');
const model = require('./db/model');
const login = require('./routes/login');
const signup = require('./routes/signup');
const home = require('./routes/home');
const cookieParser = require('cookie-parser');
const server = express();

server.use(cookieParser('djr4vbdj5fndeh'));
server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: false }));
server.use(express.static('public'));

const sessionRedirect = (request, response, next) => {
  if (!request.signedCookies.sid) response.redirect('/');
  next();
};

server.get('/', login.get);
server.post('/', login.post);

server.get('/signup', signup.get);
server.post('/signup', signup.post);

server.get('/home', sessionRedirect, home.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
