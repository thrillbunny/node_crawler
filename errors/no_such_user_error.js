const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 30001;

class NoSuchUserError extends HTTPBaseError {
    constructor(id, username) {
        super(404, '该用户不存在', ERROR_CODE, `no such user: ${username}, ${id}`);
    }
}

module.exports = NoSuchUserError;