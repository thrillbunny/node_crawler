const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 40400;

class InternalServerError extends HTTPBaseError {
    constructor(resourceName, resourceId, httpMsg) { // paramName 错误参数 desc 错误描述
        super(404, httpMsg, ERROR_CODE, `${resourceName} not found, id: ${resourceId}`);
    }
}

module.exports = InternalServerError;