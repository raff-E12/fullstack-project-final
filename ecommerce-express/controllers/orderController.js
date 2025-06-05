const countries = require("../data/countries")
const validator = require("validator")
const connection = require("../data/db");
const slugify = require("slugify");

const show = (req, res) => {
  const { slug } = req.params;
  const sql = `SELECT *  FROM orders INNER JOIN customers ON orders.id = customers.order_id WHERE orders.slug = ?`;
  connection.query(sql, [slug], (error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }
    if (result.length === 0) {
      return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
    }
    return res.status(200).json({ msg: "Benvenuto nell'API di Orders", code: 200, orders: result });
  })
}



const indexDiscountCode = (req, res) => {
  const dicountCodeSql = `SELECT * 
  FROM promos`

  connection.query(dicountCodeSql, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Non è stato possibile aggiornare lo slug dell'ordine", code: 404 });
    }

    return res.status(200).json({ msg: "Benvenuto nell'API di Orders", code: 200, promos: result });
  }
  )

}

module.exports = {
  show,
  indexDiscountCode
}