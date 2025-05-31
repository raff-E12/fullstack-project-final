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

const checkoutProcess = (req, res) => {

  const { formData, amount, cartItems } = req.body;
  const {name, surname, email, billing_address, shipping_address, phone, country} = formData
  console.log(req.body);
  const sql = "INSERT INTO customers (`name`, `surname`, `email`, `billing_address`, `shipping_address`, `phone`, `country`) VALUES (?, ?, ?, ?, ?, ?, ?);"

  const getinitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;

  }

  const initials = getinitials(name, surname);

  connection.query(sql, [name, surname, email, billing_address, shipping_address, phone, country], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }

    const sql2 = `SELECT * FROM customers WHERE customers.name = ? AND customers.surname = ? AND customers.email = ?`
    connection.query(sql2, [name, surname, email], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Errore del database", code: 500 });
      }
      if (result.length === 0) {
        return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
      }
      // Inserimento dell'ordine
      const slug = '0'
      const order_status = "Processing";
      const sql3 = "INSERT INTO orders (`amount`, `order_status`, slug) VALUES ( ?, ?, ?);"
      connection.query(sql3, [amount, order_status, slug], (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ msg: "Errore del database", code: 500 });
        }
        if (result.length === 0) {
          return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
        }

        const orderId = result.insertId;

        const slug = slugify(`${initials}-${Date.now()}-${orderId}`, { lower: true })

        const sql4 = "UPDATE orders SET slug = ? WHERE id = ?"

        connection.query(sql4, [slug, orderId], (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ msg: "Errore del database", code: 500 });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Non è stato possibile aggiornare lo slug dell'ordine", code: 404 });
          }

          return res.status(200).json({ msg: "Benvenuto nell'API di Orders", code: 200, checkout: result });
        }
        )

      })
    })
  })

}

const indexDiscountCode = (req, res)=>{
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
  checkoutProcess,
  indexDiscountCode
}