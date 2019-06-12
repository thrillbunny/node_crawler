const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const logger = require('./utils/loggers/logger');
const errorHandler = require('./middlewares/http_error_handler'); 
const NotFoundError = require('./errors/resource_not_found_error'); 

require('./services/mongodb_connection');

const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// error handler
app.use((req, res, next) => {
  if(!res.headersSent) {
    next(new NotFoundError(req.method, req.path, '您查找的资源不存在'));
  }
});

app.use(errorHandler());

process.on('uncaughtException', (err) => {
  logger.error('uncaught exception', { err });
});
process.on('unhandledReject' , (reason, p) => {
  logger.error('unhandledRejection', { reason, p });
});


module.exports = app;
