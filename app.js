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

app.set("views", path.join(__dirname,'views'));
app.set('view engine', "ejs");

let errorPath
let lastDate
let lastPath

app.use((req, res, next) => {
  const now = new Date();
  let when = date.format(now, 'YYYY/MM/DD HH:mm:ss')
  let idData = when +'\n';
  let where = req.path;

  let reqPath = `${idData} path: ${req.path}\n`;
  console.log(reqPath);

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

// only using the absolute path as the route worked
app.get('/dist/css/happenings/:id',(req,res,next) =>{
  let id = req.params.id;
  console.log('id =',id)
    res.render('index.ejs', {file: `/images/upcoming/${id}`});
  next();
})
//the get above along with the root path below was the only solution that worked 
app.use(express.static(path.join(__dirname,'./')));

app.use(express.static(path.join(__dirname,'./dist')));
app.use(express.static(path.join(__dirname,'./', 'dist', 'js')));
app.use(express.static(path.join(__dirname,'./dist/css/')));
app.use(express.static(path.join(__dirname,'./dist/css/newledo')));
app.use(express.static(path.join(__dirname,'./dist/css/contact')));
app.use(express.static(path.join(__dirname,'./dist/css/residency/')));
app.use(express.static(path.join(__dirname,'./dist/css/projects/')));
app.use(express.static(path.join(__dirname, './dist/css/happenings/')));
app.use(express.static(path.join(__dirname, './dist/css/grange-garden/')));
app.use(express.static(path.join(__dirname, './dist/css/waterwise/')));
app.use(express.static(path.join(__dirname, './dist/css/fluxscape/')));


app.get('/open-call',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/open-call.html'))
});

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
app.get('/waterwise',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/waterwise.html'))
});
app.get('/fluxscape',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/fluxscape.html'))
});

let corsOptions = {
  origin: 'https://www.newledohub.org/newledo/sendEmail',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'))
});

 app.listen(PORT);
