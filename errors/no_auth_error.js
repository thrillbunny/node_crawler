const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 40101;

class NoAuthError extends HTTPBaseError {
    constructor(id, username) {
        super(401, '您没有访问的权限', ERROR_CODE, `no auth, token: ${token}`);
    }
}

module.exports = NoAuthError;