const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 40000;

class HTTPReqParamError extends HTTPBaseError {
    constructor(paramName, desc, msg) { // paramName 错误参数 desc 错误描述
        super(200, desc, ERROR_CODE, `${paramName} wrong: ${msg}`);
    }
}

module.exports = HTTPReqParamError;