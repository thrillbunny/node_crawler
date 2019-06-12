// 放置用户会与其他数据结构或模型进行交互的一系列行为

// const User = require('../models/user/user');
const User = require('../models/mongoose/user');
const Subscription = require('../models/user/subscription');

const HTTPRequestParamError = require('../errors/http_request_param_error');
const NoSuchUserError = require('../errors/no_such_user_error');

const JWT = require('jsonwebtoken');
const JWTConfig = require('../cipher/jwt_config');

// module.exports.getAllUsers = function() {
//     return User.list();
// }

// module.exports.addNewUser = function(firstName, lastName, age) {
//     return User.insert(firstName, lastName, age);
// }

// module.exports.getUserById = function(userId) {
//     return User.getOneById(userId);
// }

// module.exports.createSubscription = function(userId, url) {
//     const user = User.getOneById(userId);
//     if(!user) throw Error('no such user!');
//     const sub = Subscription.insert(userId, url);
//     return sub;
// }

module.exports.getAllUsers = async function() {
    return await User.list();
}

module.exports.addNewUser = async function(user) {
    // 用户校验
    if(!user.username || !user.password || !user.name) {
        throw new HTTPRequestParamError('user', 
        '用户名或密码不能为空',
        'empty username or password',
        );
    }
        
    const created = await User.createUserByNamePass(user);
    const token = JWT.sign({
        _id: created._id.toString(),
        expireAt: Date.now().valueOf() + JWTConfig.expireIn,
    }, JWTConfig.SECRET);

    return {
        token,
        user: created
    };
}

module.exports.loginWithNamePass = async function(username, password) {
    // 用户校验
    if(!username || !password) {
        throw new HTTPRequestParamError('user', 
        '用户名或密码不能为空',
        'empty username or password',
        );
    }
    
    const found = User.getUserByNamePass(username, password);

    if(!found) {
        throw new NoSuchUserError(null, username);
    }

    const token = JWT.sign({
        _id: found._id.toString(),
        expireAt: Date.now().valueOf() + JWTConfig.expireIn,
    }, JWTConfig.SECRET);

    return {
        token,
        user: found
    };
}

module.exports.getUserById = async function(userId) {
    return await User.getOneById(userId);
}

module.exports.createSubscription = async function(userId, url) {
    const user = await User.getOneById(userId);
    if(!user) throw Error('no such user!');
    const sub = Subscription.insert(userId, url);
    return sub;
}
