/**
 * Handle not found cases
 *
 * @param res
 * @param errorMessage
 */
function notFoundHelper(res, errorMessage) {
    res.status(404).json({
        error: errorMessage
    });
}


module.exports = {
    notFoundHelper
}