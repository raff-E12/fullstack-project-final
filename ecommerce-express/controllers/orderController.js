
const connection = require("../data/db");

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
  const { id } = req.params;
  const sql = `SELECT *  FROM orders INNER JOIN customers ON orders.customer_id = customers.id WHERE orders.id = ?`;
  connection.query(sql, [id], (error, result) => {
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
  const sql = "INSERT INTO customers (`name`, `surname`, `email`, `billing_address`, `shipping_address`, `phone`, `country`) VALUES (?, ?, ?, ?, ?, ?, ?);"

  connection.query(sql, [name, surname, email, billing_address, shipping_address, phone, country], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: "Errore del database", code: 500 });
    }
    if (result.length === 0) {
      return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
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
        return res.status(200).json({ msg: "Benvenuto nell'API di Orders", code: 200, orders: result });
      })
    })
  })
}

const customerPatch = (req, res) => {
  const customer = req.body;

  if (customer) {

    const { name, surname, email, billing_address, shipping_address, phone, country, id } = customer;
    sql = "UPDATE customers SET name = ?, surname = ?, email = ?, billing_address = ?, shipping_address = ?, phone = ?, country = ? WHERE id = ?";
    connection.query(sql, [name, surname, email, billing_address, shipping_address, phone, country, id], (error, result) => {
      if (error) {
        return res.status(500).json({ msg: "Errore del database", code: 500 });
      }
      if (result.length === 0) {
        return res.status(404).json({ msg: "Non è stato possibile trovare risultati", code: 404 });
      }
      return res.status(200).json({ msg: "Benvenuto nell'API di Orders", code: 200, orders: result });
    })

  }


}


module.exports = {
  // index,
  show,
  checkoutProcess,
  customerPatch
}