
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

  // Added 'discount' to destructuring
  const { q, search, brand, fabric, min_price, max_price, sort_by, discount } = req.query;

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
    arrayParams.push(`%${fabric.trim()}%`);
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

  // --- New Discount Filter Logic ---
  if (discount === 'true') {
    sql += ` AND discount IS NOT NULL
             AND discount < price
             AND CURDATE() BETWEEN start_discount AND end_discount`;
  }
  // --- End New Discount Filter Logic ---

  // --- Sorting Logic ---
  switch (sort_by) {
    case 'price_asc':
      sql += ' ORDER BY price ASC';
      break;
    case 'price_desc':
      sql += ' ORDER BY price DESC';
      break;
    case 'name_asc':
      sql += ' ORDER BY products.name ASC';
      break;
    case 'name_desc':
      sql += ' ORDER BY products.name DESC';
      break;
    case 'latest':
      sql += ' ORDER BY products.create_date DESC';
      break;
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