// Production 模式
const Production = {
    logger: {
        path: '/var/logs/node-crawler'
    },
    mongo: {
        url: 'mongodb://localhost:27017/users'
    },
    redis: {
        port: 6379,
        host: 'localhost'
    }
};

// Debug 模式
const Debug = {
    logger: {
        path: './logs/'
    },
    mongo: {
        url: 'mongodb://localhost:27017/users'
    }
};

if(process.env.NODE_ENV === 'production') {
    module.exports = Production;
} else {
    module.exports = Debug;
}