//a2-sendmail.js
const nodemailer = require("nodemailer");
const apndFile = require('./apnd-file')
const formDataLogFormat = require('./form-data-log-format')
const date = require('date-and-time')

function a2SendMail(subject, text, html) {
  let transporter;
  let RECIPIENT = process.env.RECIPIENT;
  const recipients = RECIPIENT.split(',');
  for (let i = 0; i < recipients.length; i++) {
    const now = new Date();
    let idData = date.format(now, 'YYYY/MM/DD HH:mm:ss');

    const msg = {
      from: process.env.MAIL_USER,
      to: recipients[i],
      replyTo: process.env.MAIL_USER,
      dsn: {
        id: idData,
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: process.env.MAIL_USER
      }
    }
    msg.subject = subject;
    msg.text = text;
    msg.html = html;

    let strMsg = formDataLogFormat(msg, idData)
    apndFile('contacts.md', strMsg);

    transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      pool: true,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        const errStrMsg = "transporter if(error) " + error + '\n' + strMsg + '\n';
        apndFile('a2log.err', errStrMsg);
      } else {
        apndFile('a2log.err', 'transporter verified' + '\n' + idData + '\n');
      }
    });

    try {
      transporter.sendMail(msg);

    } catch (error) {
      const errStrMsg = "tranporter send catch(error) " + error + '\n' + strMsg + '\n';
      apndFile('a2log.err', errStrMsg);

    }
  }
  transporter.close();
}
module.exports = a2SendMail;
