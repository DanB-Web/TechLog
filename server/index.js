const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

// Config
const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || `a secret host`;


// Middleware
app.use(
  express.json(),
  cors(),
  router
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT} 🚀🚀🚀`);
});
