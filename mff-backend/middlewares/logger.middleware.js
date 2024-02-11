const {APP_TERMINAL_COLOR_SCHEMA} = require('../config/configuration');

/**
 * Log requests & measured routing time
 *
 * @param {import('express').Request} req
 * @param res
 * @param next
 */
function loggerMiddleware(req, res, next) {
    const startTime = Date.now();
    next();
    const elapsedTime = Date.now() - startTime;
    console.log(APP_TERMINAL_COLOR_SCHEMA.INFORMATIVE(`Requested: ${req.baseUrl}${req.path} ${APP_TERMINAL_COLOR_SCHEMA.TIME(`(${elapsedTime}ms)`)}`));
}

module.exports = {
    loggerMiddleware
}