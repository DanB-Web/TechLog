const mongoose = require('mongoose');

function makeNewConnection(uri, dbName) {

    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    return db;
}

const mongoURL = process.env.MONGO_URL || '127.0.0.1:27017';
const reportsCollection = process.env.MONGO_REPORTS || 'reports'


const reportsConnection = makeNewConnection(`mongodb://${mongoURL}/${reportsCollection}`, 'reportsDB');

module.exports = {
    reportsConnection,
};