const connection = require("../data/db");

// Ottieni disponibilità per un prodotto (tutte le taglie)
const getProductAvailability = (req, res) => {
  const { productId } = req.params;

  console.log(`Richiesta disponibilità per prodotto ID: ${productId}`);

  const sql = `
    SELECT
      deposit_product.size,
      deposit_product.quantity,
      products.name as product_name,
      products.price
    FROM deposit_product
    JOIN products ON deposit_product.product_id = products.id
    WHERE deposit_product.product_id = ?
    ORDER BY
      CASE deposit_product.size
        WHEN 'XS' THEN 1
        WHEN 'S' THEN 2
        WHEN 'M' THEN 3
        WHEN 'L' THEN 4
        WHEN 'XL' THEN 5
        WHEN 'XXL' THEN 6
        ELSE 7
      END
  `;

  connection.query(sql, [productId], (error, results) => {
    if (error) {
      console.error("Errore recupero disponibilità:", error);
      return res.status(500).json({
        success: false,
        message: "Errore del database",
        error: error.message,
      });
    }

    const availability = results.map((item) => ({
      size: item.size,
      quantity: item.quantity,
      available: item.quantity > 0,
      productName: item.product_name,
      price: item.price,
    }));

    res.json({
      success: true,
      productId: parseInt(productId),
      availability: availability,
    });
  });
};

// Controlla disponibilità specifica prodotto + taglia
const checkProductAvailability = (req, res) => {
  const { productId, size } = req.params;
  const requestedQuantity = parseInt(req.query.quantity) || 1;

  console.log(
    `Controllo disponibilità: Prodotto ${productId}, Taglia ${size}, Quantità ${requestedQuantity}`
  );

  const sql = `
    SELECT quantity
    FROM deposit_product
    WHERE product_id = ? AND size = ?
  `;

  connection.query(sql, [productId, size], (error, results) => {
    if (error) {
      console.error("Errore controllo disponibilità:", error);
      return res.status(500).json({
        success: false,
        message: "Errore del database",
      });
    }

    if (results.length === 0) {
      return res.json({
        success: false,
        available: false,
        currentStock: 0,
        requestedQuantity: requestedQuantity,
        message: "Prodotto/taglia non trovata",
      });
    }

    const currentStock = results[0].quantity;
    const isAvailable = currentStock >= requestedQuantity;

    res.json({
      success: true,
      available: isAvailable,
      currentStock: currentStock,
      requestedQuantity: requestedQuantity,
      message: isAvailable
        ? "Prodotto disponibile"
        : `Stock insufficiente. Disponibili: ${currentStock}, richiesti: ${requestedQuantity}`,
    });
  });
};

// Controlla disponibilità multipla (carrello)
const checkCartAvailability = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items array richiesto",
    });
  }

  const placeholders = items
    .map(() => "(product_id = ? AND size = ?)")
    .join(" OR ");
  const queryParams = [];

  items.forEach((item) => {
    queryParams.push(item.productId, item.size);
  });

  const sql = `
    SELECT product_id, size, quantity
    FROM deposit_product
    WHERE ${placeholders}
  `;

  connection.query(sql, queryParams, (error, results) => {
    if (error) {
      console.error("Errore controllo carrello:", error);
      return res.status(500).json({
        success: false,
        message: "Errore del database",
      });
    }

    const checkResults = [];
    let allAvailable = true;

    items.forEach((item) => {
      const inventoryRecord = results.find(
        (r) => r.product_id === item.productId && r.size === item.size
      );

      const currentStock = inventoryRecord ? inventoryRecord.quantity : 0;
      const isAvailable = currentStock >= item.quantity;

      if (!isAvailable) {
        allAvailable = false;
      }

      checkResults.push({
        productId: item.productId,
        size: item.size,
        requestedQuantity: item.quantity,
        currentStock: currentStock,
        available: isAvailable,
        message: isAvailable
          ? "Disponibile"
          : `Stock insufficiente (disponibili: ${currentStock})`,
      });
    });

    res.json({
      success: true,
      allAvailable: allAvailable,
      items: checkResults,
      unavailableCount: checkResults.filter((r) => !r.available).length,
    });
  });
};

// Processa ordine (aggiorna stock)
const processOrder = (req, res) => {
  console.log("Request Body Received (Backend):", req.body);

  const {
    items,
    name,
    surname,
    email,
    billing_address,
    shipping_address,
    phone,
    country,
    amount,
    discount_applied,
    discount_code,
    items_count,
    total_quantity,
    order_date,
  } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items array richiesto",
    });
  }

  connection.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error("Errore inizio transazione:", transactionError);
      return res.status(500).json({
        success: false,
        message: "Errore transazione",
      });
    }

    // Step 1: Update deposit_product quantities
    const updateStock = (itemIndex = 0) => {
      if (itemIndex >= items.length) {
        // All stock updates are done, proceed to insert order
        insertOrder();
        return;
      }

      const item = items[itemIndex];
      const { productId, size, quantity } = item;

      const sql = `
        UPDATE deposit_product
        SET quantity = quantity - ?
        WHERE product_id = ? AND size = ? AND quantity >= ?
      `;

      connection.query(
        sql,
        [quantity, productId, size, quantity],
        (error, results) => {
          if (error) {
            return connection.rollback(() => {
              console.error("Errore aggiornamento stock:", error);
              res.status(500).json({
                success: false,
                message: `Errore aggiornamento stock per prodotto ${productId}, taglia ${size}`,
              });
            });
          }

          if (results.affectedRows === 0) {
            return connection.rollback(() => {
              console.error(
                `Stock insufficiente o prodotto non trovato per ID: ${productId}, Taglia: ${size}`
              );
              res.status(409).json({
                success: false,
                message: `Stock insufficiente per il prodotto ${productId}, taglia ${size}. Riprova l'ordine con quantità disponibili.`,
              });
            });
          }

          // Move to the next item
          updateStock(itemIndex + 1);
        }
      );
    };

    // Step 2: Insert into orders table
    const insertOrder = () => {
      const insertOrderSql = `
        INSERT INTO orders
        (amount, order_date, order_status, sku_code, free_delivery, promo_id, slug)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      let numberSkuCode = items
        .map((item) => {
          return item.productId;
        })
        .join("");

      const skuCode = `SKU00${numberSkuCode}` || "SKU000";
      const orderAmount = amount || 0;
      const orderDate = new Date();
      const orderStatus = "Processing";
      const freeDelivery = 0;
      const promoId = null;
      const slug = `ml-${Date.now()}`;

      connection.query(
        insertOrderSql,
        [
          orderAmount,
          orderDate,
          orderStatus,
          skuCode,
          freeDelivery,
          promoId,
          slug,
        ],
        (insertError, insertResult) => {
          if (insertError) {
            return connection.rollback(() => {
              console.error("Errore inserimento ordine:", insertError);
              res.status(500).json({
                success: false,
                message: "Errore inserimento ordine",
              });
            });
          }

          const orderId = insertResult.insertId;
          console.log("Generated Order ID:", orderId);

          // Step 3: Insert into order_product table for each item
          const insertOrderProducts = (itemIndex = 0) => {
            if (itemIndex >= items.length) {
              // All order_product items are inserted, proceed to insert customer
              insertCustomer(orderId);
              return;
            }

            const item = items[itemIndex];
            // Destructure selectedSize, quantity, and price from the item
            const { productId, selectedSize, quantity, price } = item;

            // **FIXED HERE: The VALUES clause now has 5 '?' placeholders.**
            const insertOrderProductSql = `
              INSERT INTO order_product
              (order_id, product_id, size, quantity, price)
              VALUES (?, ?, ?, ?, ?)
            `;

            connection.query(
              insertOrderProductSql,
              [orderId, productId, selectedSize, quantity, price], // Pass selectedSize here
              (orderProductInsertError) => {
                if (orderProductInsertError) {
                  return connection.rollback(() => {
                    console.error("Errore inserimento order_product:", orderProductInsertError);
                    res.status(500).json({
                      success: false,
                      message: `Errore inserimento dettaglio ordine per prodotto ${productId}`,
                    });
                  });
                }
                insertOrderProducts(itemIndex + 1); // Process next item
              }
            );
          };

          // Step 4: Insert into customers table
          const insertCustomer = (orderId) => {
            const insertCustomerSQL = `
              INSERT INTO customers
              (name, surname, email, billing_address, shipping_address, phone, country, order_id)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            console.log("Attempting to insert customer with values:", {
              name, surname, email, billing_address, shipping_address, phone, country, orderId
            });

            connection.query(
              insertCustomerSQL,
              [name, surname, email, billing_address, shipping_address, phone, country, orderId],
              (customerInsertError, customerResult) => {
                if (customerInsertError) {
                  return connection.rollback(() => {
                    console.error("ERRORE DETTAGLIATO INSERIMENTO CLIENTE:", customerInsertError);
                    return res.status(500).json({
                      success: false,
                      message: "Errore database (cliente)",
                    });
                  });
                }

                const customerId = customerResult.insertId;

                // Step 5: Commit the transaction
                connection.commit((commitError) => {
                  if (commitError) {
                    return connection.rollback(() => {
                      console.error("Errore commit transazione:", commitError);
                      res.status(500).json({
                        success: false,
                        message: "Errore commit transazione",
                      });
                    });
                  }

                  res.json({
                    success: true,
                    message: "Ordine e cliente processati con successo",
                    orderId: orderId,
                    customerId: customerId,
                    itemsProcessed: items.length,
                    totalAmount: orderAmount,
                  });
                });
              }
            );
          };

          // Start inserting order products
          insertOrderProducts();
        }
      );
    };

    // Start updating stock
    updateStock();
  });
};

module.exports = {
  getProductAvailability,
  checkProductAvailability,
  checkCartAvailability,
  processOrder,
};