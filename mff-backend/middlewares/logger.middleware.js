const {APP_TERMINAL_COLOR_SCHEMA} = require('../config/configuration');

/**
 * Get the requested path of the API
 *
 * @param req
 * @returns {string | *}
 */
function getRequestedPath(req) {
    return APP_TERMINAL_COLOR_SCHEMA.PATH(`${req.baseUrl}${req.path}`);
}

/**
 * Get the calculated execution time of the requested API
 *
 * @param elapsedTime
 * @returns {string | *}
 */
function getEvaluatedTime(elapsedTime) {
    return APP_TERMINAL_COLOR_SCHEMA.TIME(`(${elapsedTime}ms)`);
}

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
    console.log(APP_TERMINAL_COLOR_SCHEMA.INFORMATIVE(`Requested: ${(getRequestedPath(req))} ${(getEvaluatedTime(elapsedTime))}`));
}

module.exports = {
    loggerMiddleware
}