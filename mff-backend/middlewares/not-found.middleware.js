const {notFoundHelper} = require('../helpers/not-found.helper');
function notFoundMiddleware(req, res) {
    notFoundHelper(res, `${req.baseUrl}${req.path} does not exist`);
}


module.exports = {
    notFoundMiddleware
}