function notFoundMiddleware(req, res) {
    res.status(404).json({
        error: `${req.baseURL}${req.path} does not exist`
    });
}


module.exports = {
    notFoundMiddleware
}