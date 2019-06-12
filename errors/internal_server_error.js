const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 50000;

class InternalServerError extends HTTPBaseError {
    constructor(msg) { // paramName 错误参数 desc 错误描述
        super(500, '服务器连接出错，请稍后再试', ERROR_CODE, `something went wrong: ${msg}`);
    }
}

module.exports = InternalServerError;