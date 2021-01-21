import mongoose, { Connection } from 'mongoose';

function connectToDB (uri : string, dbName: string) : Connection {

  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .once('open', () => { console.log(`Successful connection to ${dbName}!`) })
  .on('error', console.error.bind(console, `${dbName} connection error...`));

  return db;
}

export default () => connectToDB(process.env.DB_URL!, process.env.DB_NAME!)
