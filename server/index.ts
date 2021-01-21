import express from 'express';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';
dotenv.config()

import connection from './models/connection'

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

// Connect to the databse and start the server
connection();
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT} 🚀🚀🚀`);
});
