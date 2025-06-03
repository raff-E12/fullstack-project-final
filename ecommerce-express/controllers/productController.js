
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
  const filterProduct = {};
  const variation = [];

  const sql = `SELECT
    products.*,
    categories.name AS category_name,
    deposit_product.size,
    deposit_product.quantity
FROM
    products
JOIN
    categories ON products.category_id = categories.id 
JOIN 
    deposit_product ON deposit_product.product_id = products.id
WHERE products.slug = ?`;
  connection.query(sql, [slug], (error, result) => {
    result.map((product) => {
      filterProduct.id = product.id;
      filterProduct.name = product.name;
      filterProduct.slug = product.slug;
      filterProduct.description = product.description;
      filterProduct.price = product.price;
      filterProduct.discount = product.discount;
      filterProduct.start_discount = product.start_discount;
      filterProduct.end_discount = product.end_discount;
      filterProduct.image_url = product.image_url;
      filterProduct.image_still_life_url = product.image_still_life_url;
      filterProduct.category_name = product.category_name;
      filterProduct.category_slug = product.category_slug;

      variation.push({
        size: product.size,
        quantity: product.quantity
      });
    })

    const allSizeProduct = { ...result[0], variations: variation };

    if (error) {
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }
    if (result.length === 0) {
      return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
    }
    return res.status(200).json({ msg: "Benvenuto nell' API", code: 200, products: allSizeProduct });
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
    categories.slug = ?`
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

const indexHome = (req, res) => {
  // Query for New Arrivals (e.g., ordered by creation date)
  let newArrivalsSql = `SELECT
    products.*,
    categories.name AS category_name,
    categories.slug AS category_slug
  FROM
    products
  JOIN
    categories ON products.category_id = categories.id
  ORDER BY
    products.create_date DESC 
  LIMIT 7`;

  // Query for Highest Priced Products
  let highestPricedSql = `SELECT
    products.*,
    categories.name AS category_name,
    categories.slug AS category_slug
  FROM
    products
  JOIN
    categories ON products.category_id = categories.id
  ORDER BY
    products.price DESC
  LIMIT 7`;

  // Execute both queries
  connection.query(newArrivalsSql, (errorNewArrivals, resultNewArrival) => {
    if (errorNewArrivals) {
      console.error("Errore del database per i nuovi arrivi:", errorNewArrivals);
      return res.status(500).json({ msg: "Errore del database per i nuovi arrivi", code: 500 });
    }

    connection.query(highestPricedSql, (errorHighestPriced, resultHighestPrice) => {
      if (errorHighestPriced) {
        console.error("Errore del database per i prodotti più costosi:", errorHighestPriced);
        return res.status(500).json({ msg: "Errore del database per i prodotti più costosi", code: 500 });
      }


      if (resultNewArrival.length === 0 && resultHighestPrice.length === 0) {
        return res.status(404).json({ msg: "Non è stato possibile trovare risultati per i nuovi arrivi o i prodotti più costosi", code: 404 });
      }

      return res.status(200).json({
        msg: "Benvenuto nell'API",
        code: 200,
        products: {
          newArrivals: resultNewArrival,
          highestPriced: resultHighestPrice
        }
      });
    });
  });
};


module.exports = {
  index,
  show,
  indexProductCategory,
  indexHome
}