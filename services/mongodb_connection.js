const mongoose = require('mongoose');
const logger = require('../utils/loggers/app_logger');
const mongoSetting = require('../setting').mongo;

mongoose.Promise = Promise;

const uri = mongoSetting.url;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('open', () => {
    // console.log('db connected');
    logger.info(`Successfully connected to db, uri: ${uri}`);
});

db.on('error', (e) => {
    console.log(e);
    logger.error(`Error connecting to db, uri: ${uri}`, { err: e });
})

module.exports = db;