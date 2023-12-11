
// mongodb
require("./config/db");

//application is  made of it
const express = require("express");

//applies json values to our server request
const bodyParser = express.json;

//helps to talk to backend
const cors = require("cors");

const routes = require("./routes")

//create server app
const app = express();

//middle ware
app.use(cors());
app.use(bodyParser());

//apply versioning
app.use("/api/v1", routes);

module.exports = app;