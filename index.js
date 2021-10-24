'use strict';

// Imports express (web framework for Node.js)
const express = require('express');
const multer = require('multer');
const model = require('./db/model');
const login = require('./routes/login');
const signup = require('./routes/signup');
const home = require('./routes/home');
const sessionAuth = require('./middleware/sessionauth');
const cookieParser = require('cookie-parser');

const server = express();
const upload = multer();

server.use(cookieParser('djr4vbdj5fndeh'));
server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: false }));
server.use(express.static('public'));

const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

server.get('/', login.get);
server.post('/', login.post);

server.get('/signup', signup.get);
server.post('/signup', signup.post);

server.use(sessionAuth);

server.get('/user/:id/photo/:photoid', (req, res) => {
  model.getPhoto(req.params.id, req.params.photoid, req).then((user) => {
    res.send(user.photo);
  });
});

server.post('/home', upload.single('profile'), async (request, response) => {
  const { id } = await request.session;
  const file = await request.file;
  await model.createImage(file.buffer, id);
  response.redirect('/home');
});

server.get('/home', home.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
