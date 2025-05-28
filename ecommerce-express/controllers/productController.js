
const connection = require("../data/db");

const index = (req, res) => {
  let sql = `SELECT
    products.*,
    categories.name AS category_name,
    categories.slug AS category_slug
  FROM
    products
  JOIN
    categories ON products.category_id = categories.id
  WHERE 1=1`;

  const arrayParams = [];

  const { q, search, brand, fabric, min_price, max_price, on_sale } = req.query; // q parametro creato per farlo interfacciare col front end

  const searchTerm = q || search;
  if (searchTerm) {
    sql += ` AND (
      products.name LIKE ?
      OR brand LIKE ?
      OR categories.name LIKE ?
    )`;
    const likeTerm = `%${searchTerm}%`;
    arrayParams.push(likeTerm, likeTerm, likeTerm);
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
    sql += ` AND discount_price IS NOT NULL 
    AND discount_price < price 
    AND CURDATE() BETWEEN start_discount AND end_discount`;
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
  });
}

const show = (req, res) => {
  const { slug } = req.params;
  const sql = `SELECT
    products.*,
    categories.name AS category_name
FROM
    products
JOIN
    categories ON products.category_id = categories.id WHERE products.slug = ?`;
  connection.query(sql, [slug], (error, result) => {
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
  const { categorySlug } = req.params;
  const sql = `SELECT
    products.*,
    categories.name AS category_name,
    categories.slug AS category_slug
FROM
    products
JOIN
    categories ON categories.id = products.category_id
WHERE
    categories.slug = ?;`
  connection.query(sql, [categorySlug], (error, result) => {
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