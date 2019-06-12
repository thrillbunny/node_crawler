class HTTPBaseError extends Error {
    constructor(httpStatusCode, httpMsg, errCode, msg) {
        super(`HTTP Code: ${msg}`);
        this.httpStatusCode = httpStatusCode;
        this.httpMsg = httpMsg;
        this.errCode = errCode;
    }
}

module.exports = HTTPBaseError;

// 测试代码
// try {
//     throw new HTTPBaseError(404, 'Rescource not found', 10000, 'Rescource not found');
// } catch(e) {
//     console.log(e);
//     console.log(e.httpStatusCode);
//     console.log(e.httpMsg);
//     console.log(e.errCode);
// }