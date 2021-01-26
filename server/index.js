const app = require('./app');
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || `a secret host`;

//Start server
app.listen(PORT, ()=> {
  console.log(`Server running on ${HOST}:${PORT} 🚀🚀🚀`);
});
