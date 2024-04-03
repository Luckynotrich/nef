//const open = require('open')
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const apndFile = require('./dist/js/apnd-file.js')
const date = require('date-and-time');

require('dotenv').config({ debug: true })

//block port for remote
const PORT = process.env.PORT || 5000;
const app = express();

let errorPath

app.use((req, res, next) => {
  const now = new Date();
  let idData = date.format(now, 'YYYY/MM/DD HH:mm:ss');
let reqPath = `\n${idData} path: ${req.path} \n`;
  
  apndFile('log_app.log',reqPath);
  
  errorPath = req.path;
  next() // calling next middleware function or handler
})
app.use(express.static( path.join(__dirname,'./', 'dist')))
app.use(express.static( path.join(__dirname,'./', 'dist', 'js')))
app.use(express.static(path.join(__dirname,'./dist/css/')));
app.use(express.static(path.join(__dirname,'./dist/css/newledo')));
app.use(express.static(path.join(__dirname,'./dist/css/contact')));
app.use(express.static(path.join(__dirname,'./dist/css/residency/')))
app.use(express.static(path.join(__dirname, './dist/css/happenings/')))
app.use(express.static(path.join(__dirname, './dist/css/grange-garden/')))


app.get('/open-call.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/open-call.html'))
})
app.get('/residency.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/residency.html'))
})
app.get('/events/',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/happenings.html'))
})
app.get('/grange-garden.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/grange-garden.html'))
})
let corsOptions = {
  origin: 'https://www.newledohub.org/newledo/sendEmail',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.get('/contact-page.html',cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, './', 'dist', 'contact-page.html'))
})
app.get('/rsvp.html',cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, './', 'dist', 'rsvp.html'))
})
try {

  app.use('/newledo/', require('./dist/js/send-mail.js'))
} catch (error) {
  const errStrMsg ='\n'+ error + '\n' + 'errorPath: ' + errorPath + '\n'
  apndFile('a2log.err', errStrMsg);
  console.error();
};
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'))
})


 app.listen(PORT,/* block port for remote */ 
   console.log(`Check out the references on http://localhost:${PORT}`));

