
const connection = require("../data/db");

const index = (req, res) => {
    return res.status(200).json({msg: "Benvenuto nell' API di Order", code: 200});
}


function show(req, res) {
    return res.status(200).json({msg: "Benvenuto nella Show di Order", code: 200});
}


function store(req, res) {
    return res.status(200).json({msg: "Benvenuto nella Store di Order", code: 200});
}


module.exports = {
    index,
    show,
    store
}