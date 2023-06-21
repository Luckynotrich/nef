const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
const dotenv = require('dotenv');
dotenv.config();
const a2SendMail = require('./dist/js/a2-sendmail.js');
const apndFile = require("./apnd-file.js");
const multiparty = require("multiparty");



router.post("/sendEmail", (req, res) => {
  apndFile('sendmail.log','in')
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, (err, fields) =>{
    Object.keys(fields).forEach( (property) =>{
      data[property] = fields[property].toString();
      //console.log(property + ' ' + data[property] + '\n')
    })
       
        subject = `New contact from ${data.name}`;
        text =  'Contact: ' + data.name + ' ' +'Phone: '+ data.phone /* +'Company: '+ data.company + ' ' */ +'Email: ' + data.email + 'Message: ' + data.message;
        html = '<h2>'+ data.message +'</h2><div>'+ 'Contact: ' + data.name + '</div><div>' + 'Phone: '+ data.phone+'</div><div>'+ 'Email: ' + data.email+'</div>';//<div>'+'Company: '+ data.company +'</div>
        //apndFile('sendmail.log',subject);
        //apndFile('sendmail.log',html);
        a2SendMail(subject,text,html);
        
      })
      res.sendStatus(200)     
})

router.get("/ends/", (req, res) => {
    res.send('router.get("/", router.post("/sendEmail",')
})
module.exports = router;

