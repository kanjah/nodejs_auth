
// mongodb
require("./src/config/db");

//application is  made of it
const express = require("express");

//applies json values to our server request
const bodyParser = express.json;

//helps to talk to backend
const cors = require("cors");

//create server app
const app = express();

app.use(cors());
app.unsubscribe(bodyParser);

module.exports = app;