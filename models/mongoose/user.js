const mongoose = require('mongoose');
const { Schema } = mongoose;

const pbkdf2Async = require('util').promisify(require('crypto').pbkdf2);
const PasswordConfig = require('../../cipher/password_config');

const HTTPReqParaError = require('../../errors/http_request_param_error');

const UserSchema = new Schema({
    name: { type: String, required: true, index: 1},
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    age: { type: Number, min: 0, max: 120},
});

const UserModel = mongoose.model('user', UserSchema);

async function insert(user) {
    const newUser = await UserModel.create(user);
    return newUser;
}

async function getOneById(id) {
    return await UserModel.findOne({ _id: id}, { password: 0 });
}

async function getOneByName(name) {
    return await UserModel.findOne({ name }, { password: 0 });
}

async function list(params) {
    const match = {};
    const flow = UserModel.find(match);
    flow.select({ password: 0 });
    const users = await flow.exec();
    return users;
}

// 用户注册
async function createUserByNamePass(user) {
    const nameDupUser = await UserModel.findOne(
        { 
            $or: [
            { username: user.username}, 
            { name: user.name }
        ] 
        },
        { _id: 1 }
        );

    if(nameDupUser) {
        throw new HTTPReqParaError(
            'username',
            '用户名或昵称已被占用',
            `duplicate username: ${user.username}`
        );
    }

    const passToSave = await pbkdf2Async(
        user.password,
        PasswordConfig.SALT,
        PasswordConfig.ITERATION_TIMES,
        PasswordConfig.KEY_LENGTH,
        PasswordConfig.DIGEST
        );
    
    const created = await insert({
        username: user.username,
        password: passToSave,
        name: user.name,

    });
    return {
        _id: created._id,
        username: created.username,
        name: created.name,

    };
}

// 用户登录
async function getUserByNamePass(username, password) {
    const passToFind = await pbkdf2Async(
        password,
        PasswordConfig.SALT,
        PasswordConfig.ITERATION_TIMES,
        PasswordConfig.KEY_LENGTH,
        PasswordConfig.DIGEST,
    );

    const found = await UserModel.findOne({
        username: username,
        password: passToFind
    }, {
        password: 0
    });

    return found;
}

module.exports = {
    insert,
    getOneById,
    getOneByName,
    list,
    createUserByNamePass,
    getUserByNamePass,

}