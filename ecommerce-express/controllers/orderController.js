import countries from "../data/countries"
const validator = require("validator")
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

 //Validazioni
//NOme e Cognome
  if (!name || !surname) {
    return res.status(400).json({ msg: "Insert a valid name and surname", code: 400 });
  }

 //Email controllo con validator
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ msg: "Mail Error: Formato email non valido.", code: 400 });
  }

//Telefono: controllo lunghezza e esistenza
const parsedPhone = parseInt(phone)
  if (!phone || phone.length < 7 || phone.length > 20 || isNaN(parsedPhone)) {
    return res.status(400).json({ msg: "Number Error: Phone number must be valid and respect standard format (7-20 digits).", code: 400 });
  }

  // Amount control
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return res.status(400).json({ msg: "Amount Error: You have to provide a valid positive price", code: 400 });
  }

  //controllo billing address

   if (!billing_address || typeof billing_address !== 'string' || validator.isEmpty(billing_address.trim())) {
        return res.status(400).json({ msg: "Billing Address: Insert a Valid Address", code: 400 }); // L'indirizzo non deve essere vuoto o solo spazi bianchi
    }

  // Lunghezza minima e massima ragionevole
    if (!validator.isLength(billing_address, { min: 10, max: 200 })) { // Esempio: 10 a 200 caratteri
        res.status(400).json({ msg: "Billing Address: Insert a Valid Address", code: 400 });
    }

  //controllo shipping_adress

   if (!shipping_address || typeof shipping_address !== 'string' || validator.isEmpty(shipping_address.trim())) {
        res.status(400).json({ msg: "Shipping Address: Insert a Valid Address", code: 400 });
    }

  // Lunghezza minima e massima ragionevole
    if (!validator.isLength(shipping_address, { min: 10, max: 200 })) { // Esempio: 10 a 200 caratteri
        res.status(400).json({ msg: "Shipping Address: Insert a Valid Address", code: 400 });
    }

  // Country control (array con countries importato from data)
  if (!country || !countries.includes(country.toLowerCase())) {
    return res.status(400).json({ msg: `Country Error: "${country}" is not a valid country`, code: 400 });
  }
  
  
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