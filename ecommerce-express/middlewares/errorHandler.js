function errorHandler(err, req, res, next) {

    res.status(500).json({
        "Error": err.message,
        "Status": 404
    })
    //next()
}


module.exports = errorHandler;