
const connection = require("../data/db");

const index = (req, res) => {
    const sql = "SELECT * FROM orders";
    connection.query(sql, (error, result) => {
      if (error) {
        return res.status(500).json({msg: "Errore del database", code: 500});
      } else if (result.length === 0) {
        return res.status(404).json({msg: "Non è stato possibile trovare risultati", code: 404});
      }
      return res.status(200).json({msg: "Benvenuto nell' API di Orders", code: 200, orders: result});
    })
}


function show(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM orders WHERE id = ?";
    connection.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({msg: "Errore del database", code: 500});
    } else if (result.length === 0) {
      return res.status(404).json({msg: "Non è stato possibile trovare risultati", code: 404});
    }
      return res.status(200).json({msg: "Benvenuto nell'API di Orders", code: 200, orders: result});
    })
}


function store(req, res) {
    return res.status(200).json({msg: "Benvenuto nella Store di Order", code: 200});
}


module.exports = {
    index,
    show,
    store
}