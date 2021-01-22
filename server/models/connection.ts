import mongoose from 'mongoose';

function connectToDB (url : string, dbName: string) : Promise<typeof import('mongoose')> {
  return mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, () => { console.log(`Successful connection to ${dbName}!`) });

}
const DB = process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST! : process.env.DB_NAME!;
export default async () => await connectToDB(process.env.DB_URL!, DB)
