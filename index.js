'use strict';

// Imports express (web framework for Node.js)
const express = require('express');
const multer = require('multer');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const home = require('./routes/home');
const profile = require('./routes/profile');
const photo = require('./routes/photo');
const sessionAuth = require('./middleware/sessionauth');

const cookieParser = require('cookie-parser');

const server = express();
const upload = multer();

server.use(cookieParser('djr4vbdj5fndeh'));
server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: false }));
server.use(express.static('public'));

server.get('/', login.get);
server.post('/', login.post);
server.post('/logout', logout.post);

server.get('/signup', signup.get);
server.post('/signup', signup.post);

server.use(sessionAuth);

server.get('/user/:id/photo/:photoid', photo.get);

server.post('/profile', upload.single('profile'), photo.post);

server.get('/home', home.get);

server.get('/profile', profile.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
