//const open = require('open')
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const apndFile = require('./dist/js/apnd-file.js')
const date = require('date-and-time');

require('dotenv').config({ debug: true })


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

app.use(express.static( path.join(__dirname,'./', 'dist', 'js')))
app.use(express.static(path.join(__dirname,'./dist/css/')));
app.use(express.static(path.join(__dirname,'./dist/css/newledo')));
app.use(express.static(path.join(__dirname,'./dist/css/contact')));
app.use(express.static(path.join(__dirname,'./events/')))
app.use(express.static(path.join(__dirname,'./dist/css/residency/')))
app.use(express.static(path.join(__dirname, './dist/happenings/')))
// app.use(express.static(path.join(__dirname, './dist/happenings/css')))


app.get('/residency.html',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/residency.html'))
})
app.get('/events/',(req,res) =>{
  res.sendFile(path.join(__dirname,'./dist/happenings/happenings.html'))
})

app.get('/contact-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'dist', 'contact-page.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'))
})

try {

  app.use('/newledo/', require('./dist/js/send-mail.js'))
} catch (error) {
  const errStrMsg ='\n'+ error + '\n' + 'errorPath: ' + errorPath + '\n'
  apndFile('a2log.err', errStrMsg);
  console.error();
};

 app.listen(PORT, 
   console.log(`Check out the references on http://localhost:${PORT}`));

