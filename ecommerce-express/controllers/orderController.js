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
  const {
    name,
    surname,
    email,
    billing_address,
    shipping_address,
    phone,
    country,
    amount,
    cartProducts
  } = req.body;

  const { quantity, id, selectedSize } = cartProducts[0];

  console.log(req.body);

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  const initials = getInitials(name, surname);
  const order_status = "Processing";
  const slugTmp = "temp"; // slug temporaneo per inserimento

  // 1. Crea ordine
  const insertOrderSQL = "INSERT INTO orders (`amount`, `order_status`, `slug`) VALUES (?, ?, ?);";
  connection.query(insertOrderSQL, [amount, order_status, slugTmp], (error, orderResult) => {
    if (error) {
      console.error("Errore inserimento ordine:", error);
      return res.status(500).json({ msg: "Errore database (ordine)", code: 500 });
    }

    const orderId = orderResult.insertId;
    const slug = slugify(`${initials}-${Date.now()}-${orderId}`, { lower: true });

    // 2. Aggiorna slug ordine
    const updateSlugSQL = "UPDATE orders SET slug = ? WHERE id = ?";
    connection.query(updateSlugSQL, [slug, orderId], (error, updateResult) => {
      if (error) {
        console.error("Errore aggiornamento slug:", error);
        return res.status(500).json({ msg: "Errore database (slug)", code: 500 });
      }

      // 3. Inserisci cliente collegato all'ordine
      const insertCustomerSQL = `
        INSERT INTO customers 
        (name, surname, email, billing_address, shipping_address, phone, country, order_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        insertCustomerSQL,
        [name, surname, email, billing_address, shipping_address, phone, country, orderId],
        (error, customerResult) => {
          if (error) {
            console.error("Errore inserimento cliente:", error);
            return res.status(500).json({ msg: "Errore database (cliente)", code: 500 });
          }

          const quantityUpdatePromises = cartProducts.map(item => {
        return new Promise((resolve, reject) => {
          const { quantity, id, selectedSize } = item;
          const updateSizeSQL = `
            UPDATE deposit_product
            SET quantity = quantity - ?
            WHERE product_id = ? AND size = ?
          `;
          connection.query(updateSizeSQL, [quantity, id, selectedSize], (err, sizeResult) => {
            if (err) {
              console.error(`Errore aggiornamento quantità prodotto (ID: ${id}, Size: ${selectedSize}):`, err);
              return reject(new Error(`Fallimento aggiornamento quantità per prodotto ID: ${id}, Size: ${selectedSize}`));
            }
            resolve(); // Risolvi la promessa per questo elemento
          });
        });
      });

      // Aspetta che tutte le promesse di aggiornamento siano risolte
      Promise.all(quantityUpdatePromises)
        .then(() => {
          return res.status(200).json({
            msg: "Ordine completato con successo",
            code: 200,
            slug: slug,
            });
          });
        }
      );
    });
  });
};



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
  checkoutProcess,
  indexDiscountCode
}