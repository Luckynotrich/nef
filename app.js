
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const apndFile = require('./dist/js/apnd-file.js')
const date = require('date-and-time');
const sendMail = require("./dist/js/send-mail");


require('dotenv').config({ debug: true, encoding: 'utf-8' })

//block port for remote
const PORT = process.env.PORT || 5000;
const app = express();

let errorPath
let lastDate
let lastPath

app.use((req, res, next) => {
  const now = new Date();
  let when = date.format(now, 'YYYY/MM/DD HH:mm:ss')
  let idData = when +'\n';
  let where = req.path;

  let reqPath = `${idData} path: ${req.path}\n`;
  // console.log(when,where);
  apndFile('console.log',`${when}, ${where}\n`)

  if(when !== lastDate) {
    apndFile('stderr.log', idData);
    lastDate = when;
  }
  if(where !== lastPath && where.endsWith('.html')){
    apndFile('log_app.log',reqPath);
    lastPath = where;
  }
  errorPath = req.path;
  next() // calling next middleware function or handler
})

//the get above along with the root path below was the only solution that worked 
app.use(express.static(path.join(__dirname,'./')));
app.use(express.static(path.join(__dirname,'./','src','scss')));
app.use(express.static(path.join(__dirname,'./dist')));
app.use(express.static(path.join(__dirname,'./', 'dist', 'js')));
app.use(express.static(path.join(__dirname,'./dist/css/')));
app.use(express.static(path.join(__dirname,'./dist/css/newledo')));
app.use(express.static(path.join(__dirname,'./dist/css/contact')));
app.use(express.static(path.join(__dirname,'./dist/css/residency/')));
app.use(express.static(path.join(__dirname,'./dist/css/projects/')));
app.use(express.static(path.join(__dirname,'./dist/css/site-vision/')));
app.use(express.static(path.join(__dirname, './dist/css/happenings/')));
app.use(express.static(path.join(__dirname, './dist/css/grange-garden/')));
app.use(express.static(path.join(__dirname, './dist/css/fluxscape/')));


app.get('/residency.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/residency.html'))
});
app.get('/projects.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/projects.html'))
});
app.get('/events/',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/happenings.html'))
});

app.get('/grange-garden.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/grange-garden.html'))
});

app.get('/fluxscape',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/fluxscape.html'))
});

let corsOptions = {
//origin: 'https://www.newledohub.org/newledo/sendEmail',
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use("/newledo/sendEmail", sendMail);
app.get('/contact-page.html',cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, './', 'dist', 'contact-page.html'))
});
app.get('/rsvp.html',cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, './', 'dist', 'rsvp.html'))
});
try {

  app.use('/newledo/', require('./dist/js/send-mail.js'))
} catch (error) {
  const errStrMsg ='\n'+ error + '\n' + 'errorPath: ' + errorPath + '\n'
  apndFile('a2log.err', errStrMsg);
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'))
});

 app.listen(PORT);
