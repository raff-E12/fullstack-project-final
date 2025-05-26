
const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM products";
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


const indexProductCategory = (req, res) => {
  const { categoryId } = req.params;
  const sql = `SELECT
    products.*,
    category_product.product_id,
    category_product.category_id,
    categories.name AS category_name
FROM
    products
JOIN
    category_product ON category_product.product_id = products.id
JOIN
    categories ON categories.id = category_product.category_id
WHERE
    categories.id = ?;`
  connection.query(sql, [categoryId], (error, result) => {
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
  indexProductCategory
}