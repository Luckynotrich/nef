
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const apndFile = require('./dist/js/apnd-file.js')
const date = require('date-and-time');
const sendMail = require("./dist/routes/send-mail.js");
const handlePost = require("./dist/routes/handle-post.js")

const morgan = require('morgan')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const corsOptions = {
  origin: ['http://localhost:5000', 'https://newledohub.org'],
  optionsSuccessStatus: 200
};

require('dotenv').config({ debug: true, encoding: 'utf-8' })

//block port for remote
const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors(corsOptions))
app.set('trust proxy', 1 /* number of proxies between user and server */)
app.get('/getip', async (request, response) => {
  apndFile('console.log','inside getip')
	await response.send(request.ip);
});

let errorPath
let lastDate
let lastPath

app.use((req, res, next) => {
  const now = new Date();
  let when = date.format(now, 'YYYY/MM/DD HH:mm:ss')
  let idData = when + '\n';
  let where = req.path;

  let reqPath = `${idData} path: ${req.path}\n`;
  // console.log(when,where);
  apndFile('console.log',  `${req.method} ${when}, ${where}\n`)

  if (when !== lastDate) {
    apndFile('stderr.log', idData);
    lastDate = when;
  }
  if (where !== lastPath && where.endsWith('.html')) {
    apndFile('log_app.log', reqPath);
    lastPath = where;
  }
  errorPath = req.path;
  next() // calling next middleware function or handler
})


app.use(express.static(path.join(__dirname, './', 'src', 'scss')));
app.use(express.static(path.join(__dirname, './', 'dist', 'js')));
app.use(express.static(path.join(__dirname, './', 'dist', 'css')));
app.use(express.static(path.join(__dirname, './dist/css/newledo')));
app.use(express.static(path.join(__dirname, './dist/css/contact')));
app.use(express.static(path.join(__dirname, './', 'dist', 'css', 'projects')));
app.use(express.static(path.join(__dirname, './dist/css/site-vision/')));
app.use(express.static(path.join(__dirname, './dist/css/fluxscape/')));


const rateLimit = require('express-rate-limit');

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: 'Too many emails sent from this IP'
});

app.use(morgan('combined', { stream: accessLogStream }));


app.post("/newledo/sendEmail", emailLimiter, cors(corsOptions), handlePost, sendMail);


app.use((req, res, next) => {
  const originalSendFile = res.sendFile;

  res.sendFile = (filepath, options, callback) => {
    // Handle optional parameters
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    // If it's an HTML file, read it, inject the script, and send
    if (filepath.endsWith('.html')) {
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          return originalSendFile.call(this, filepath, options, callback);
        }

        const umamiScript = '<script defer src="https://umami.greenthecoast.com/script.js" data-website-id="1f2ffbff-bf9b-4c04-aa64-be89609c19a0"></script>';
        const modifiedContent = data.replace('</head>', umamiScript + '</head>');

        res.type('text/html');
        res.send(modifiedContent);
        if (callback) callback();
      });
    } else {
      return originalSendFile.call(this, filepath, options, callback);
    }
  };

  next();
});


app.get('/fluxscape.html', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/fluxscape.html'))
});
app.get('/site-vision.html', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/site-vision.html'))
})
app.get('/projects.html', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/projects.html'))
});
app.get('/contact-page.html', cors(corsOptions), (req, res) => {
  res.setHeader(
    'Permissions-Policy',
    'xr-spatial-tracking=(self "https://challenges.cloudflare.com")'
  )
  res.sendFile(path.join(__dirname, './', 'dist', 'contact-page.html'))
});
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'))
});

app.listen(PORT);
