//const open = require('open')
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const apndFile = require('./dist/js/apnd-file.js')

require('dotenv').config({ debug: true })


const PORT = process.env.PORT || 5000;
const app = express();

let errorPath

app.use((req, res, next) => {
  console.log("path:", req.path)
  errorPath = req.path;
  next() // calling next middleware function or handler
})

//app.use('/newledohub.org/',express.static(path.join(__dirname, "dist")));
app.use('/newledohub.org/', express.static(path.join(__dirname, 'dist', 'js')))
app.use('/newledohub.org/', express.static(path.join(__dirname, "dist", "css")));

app.get('/newledohub.org/contact-page.html', (req, res) => {
  //console.log('            get contact',path.join(__dirname,'./','dist','contact-page.html'))
  res.sendFile(path.join(__dirname, './', 'dist', 'contact-page.html'))
})
app.get('/newledohub.org/', (req, res) => {
  //console.log('          get index')
  res.sendFile(path.join(__dirname, './', 'dist', 'index.html'))
})

try {

  app.use('/newledo/', require('./dist/js/send-mail.js'))
} catch (error) {
  const errStrMsg = error + '\n' + 'errorPath: ' + errorPath + '\n'
  apndFile('a2log.err', errStrMsg);
  console.error();
};

app.listen(
  PORT,
  console.log(`Check out the references on http://localhost:${PORT}`)
);
//(async () => { await open('http://localhost:'+ PORT+'/', { app: { name: 'google-chrome' } }) })()	

