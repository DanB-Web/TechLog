const mongoose = require('mongoose');

function makeNewConnection(uri, dbName) {

    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    // db.once('open', () => { console.log(`Successful connection to ${dbName}!`) });

    // db.on('error', console.error.bind(console, `${dbName} connection error...`));

    return db;
}

const reportsConnection = makeNewConnection('mongodb://127.0.0.1:27017/reports', 'reportsDB');

module.exports = {
    reportsConnection,
};