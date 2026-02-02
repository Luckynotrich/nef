const express = require("express");
const sendMail = express.Router();
sendMail.use(express.urlencoded({ extended: false }));
const dotenv = require('dotenv');
// dotenv.config();
const a2SendMail = require('./a2-sendmail.js');
const apndFile = require("./apnd-file.js");
const multiparty = require("multiparty");

sendMail.use(async(req,res,next)=>{
  console.log(`in send-mail path: ${req.path}`)
  next()
})

sendMail.post("/", (req, res) => {
  apndFile('sendmail.log','in')
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, (err, fields) =>{
    Object.keys(fields).forEach( (property) =>{
      data[property] = fields[property].toString();
    })
       
        subject = `${data.contactType} from ${data.name}`;
        text =  'Contact: ' + data.name + ' ' +'Phone: '+ data.phone + 'Email: ' + data.email + 'Message: ' + data.message;
        html = '<h2>'+ data.message +'</h2><div>'+ 'Contact: ' + data.name + '</div><div>' + 'Phone: '+ data.phone +'</div><div>'+ 'Email: ' + data.email+'</div>';
        a2SendMail(subject,text,html);
        
      })
      res.sendStatus(200)     
})

sendMail.get("/", (req, res) => {
    res.send('sendMail.get("/", sendMail.post("/",')
})
module.exports = sendMail;

