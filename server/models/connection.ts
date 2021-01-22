import mongoose from 'mongoose';

function connectToDB (url : string, dbName: string) : Promise<typeof import('mongoose')> {
  return mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, () => { console.log(`Successful connection to ${dbName}!`) });

}

export default async () => await connectToDB(process.env.DB_URL!, process.env.DB_NAME!)
