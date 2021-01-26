const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

//Config
const app = express();

//Middleware
app.use(
  express.json(),
  cors(),
  router
);

module.exports = app;
