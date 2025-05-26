
const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT tb1.*, (SELECT name FROM categories WHERE id = tb2.category_id) AS category FROM products AS tb1 INNER JOIN category_product AS tb2 ON tb1.id = tb2.product_id";
  connection.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }
    if (result.length === 0) {
      return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
    }
    return res.status(200).json({ msg: "Benvenuto nell' API", code: 200, products: result });
  })
}


const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";
  connection.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }
    if (result.length === 0) {
      return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
    }
    return res.status(200).json({ msg: "Benvenuto nell' API", code: 200, products: result });
  })
}

module.exports = {
  index,
  show,
}