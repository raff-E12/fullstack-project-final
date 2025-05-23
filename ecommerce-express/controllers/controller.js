
const connection = require("../data/db");

const index = (req, res) => {
    return res.status(200).json({msg: "Benvenuto nell API", code: 200});
}


function show(req, res) {
    return res.status(200).json({msg: "Benvenuto nella Show", code: 200});
}


function store(req, res) {
    return res.status(200).json({msg: "Benvenuto nella Store", code: 200});
}


module.exports = {
    index,
    show,
    store
}