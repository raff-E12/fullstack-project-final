
const connection = require("../data/db");

const index = (req, res) => {
  let sql = "SELECT * FROM products WHERE 1=1"; 
  const arrayParams = [];

  const { q, search, brand, fabric, min_price, max_price, on_sale } = req.query;

  const searchTerm = q || search;
  if (searchTerm) {
    sql += " AND name LIKE ?";
    arrayParams.push(`%${searchTerm}%`);
  }


  if (brand) {
    sql += " AND brand = ?";
    arrayParams.push(brand.trim());
  }

  if (fabric) {
    sql += " AND fabric LIKE ?";
    arrayParams.push(fabric.trim());
  }

  if (min_price && max_price) {
    sql += " AND price >= ? AND price <= ?";
    arrayParams.push(parseFloat(min_price), parseFloat(max_price));
  } else if (min_price) {
    sql += " AND price >= ?";
    arrayParams.push(parseFloat(min_price));
  } else if (max_price) {
    sql += " AND price <= ?";
    arrayParams.push(parseFloat(max_price));
  }

  if (on_sale === 'true') {
    sql += `AND discount_price IS NOT NULL 
    AND discount_price < price 
    AND CURDATE() BETWEEN start_discount AND end_discount`
  }

  connection.query(sql, arrayParams, (error, result) => {
    if (error) {
      console.error("Errore del database:", error);
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