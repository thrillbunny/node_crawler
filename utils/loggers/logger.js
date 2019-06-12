const loggerSetting = require('../../setting').logger;
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            name: 'base_logger',
            filename: `${loggerSetting.path}info.log.`,
            prepend: false,
            datePattern: 'yyyy_MM_dd',
            level: 'info'
        }),
        new DailyRotateFile({
            name: 'error',
            filename: `${loggerSetting.path}error.log.`,
            prepend: false,
            datePattern: 'yyyy_MM_dd',
            level: 'error'           
        }),
    ]
})

module.exports = logger;