const countries = require("../data/countries")
const validator = require("validator")
const connection = require("../data/db");
const validationCheckoutProcess = require("../middlewares/validationCheckoutProcess");

// const index = (req, res) => {
//   const sql = "SELECT * FROM orders";
//   connection.query(sql, (error, result) => {
//     if (error) {
//       return res.status(500).json({ msg: "Errore del database", code: 500 });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
//     }
//     return res.status(200).json({ msg: "Benvenuto nell' API di Orders", code: 200, orders: result });
//   })
// }


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
  
  const { name, surname, email, billing_address, shipping_address, phone, country, amount } = req.body;
  console.log(req.body);
  const sql = "INSERT INTO customers (`name`, `surname`, `email`, `billing_address`, `shipping_address`, `phone`, `country`) VALUES (?, ?, ?, ?, ?, ?, ?);"
  
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
      const customerId = result[0].id;
      const order_status = "Pending";
      const sql3 = "INSERT INTO orders (`amount`, `order_status`, `customer_id`) VALUES ( ?, ?, ?);"
      connection.query(sql3, [amount, order_status, customerId], (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ msg: "Errore del database", code: 500 });
        }
        if (result.length === 0) {
          return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
        }
        return res.status(200).json({ msg: "Benvenuto nell'API di Orders", code: 200, checkout: result });
      })
    })
  })
  
}

const checkoutComplete = ()=> {
  // update dell'ordine: cambio status ordine, prezzo, metodo di pagamento
  // post order_product: tutti i prodotti ordinati
  // Invio email
}

module.exports = {
  // index,
  show,
  checkoutProcess
}