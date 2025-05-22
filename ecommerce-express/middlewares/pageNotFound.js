function pageNotFound(req, res, next) {
    res.status(404).json({
        "Error": "Page not Found",
        "Status": 404
    })
}


module.exports = pageNotFound;