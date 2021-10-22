// Imports express (web framework for Node.js)
const express = require('express');

// CookieParser is middleware for signing cookies
const cookieParser = require('cookie-parser')

const server = express();

// server.use(log)
server.use(cookieParser('somerandomstrings'))
server.use(express.urlencoded({ extended: false }));

server.get('/',  (req, res) => {
    if (req.signedCookies) 
    res.send(req.signedCookies)
})

server.get("/cookie", (req, res) => {
  res.cookie("hello", "this is my cookie", COOKIE_OPTIONS);
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;

const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 1000 * 60, // 60,000ms (60s)
    sameSite: "lax",
    signed: true,
}

// function log(req,res,next) {
//     console.log(req.method + req.url);
//     next()
// }

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));