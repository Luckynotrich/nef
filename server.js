//const open = require('open')
const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.listen(
	PORT,
	console.log(`Check out the references on http://localhost:${PORT}`)
);
//(async () => { await open('http://localhost:'+ PORT+'/', { app: { name: 'google-chrome' } }) })()	

