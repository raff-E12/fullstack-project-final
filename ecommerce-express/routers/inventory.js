const express = require("express");
const router = express.Router();
const connection = require("../data/db"); // Adatta il path al tuo progetto

// Ottieni disponibilità per un prodotto (tutte le taglie)
router.get("/product/:productId/availability", (req, res) => {
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

    console.log(`Disponibilità trovata per prodotto ${productId}:`, results);

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
});

// Controlla disponibilità specifica prodotto + taglia
router.get("/check/:productId/:size", (req, res) => {
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
      console.log(
        `Nessun risultato trovato per prodotto ${productId}, taglia ${size}`
      );
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

    console.log(
      `Stock per ${productId}-${size}: ${currentStock}, richiesto: ${requestedQuantity}, disponibile: ${isAvailable}`
    );

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
});

// Controlla disponibilità multipla (per il carrello)
router.post("/check-cart", (req, res) => {
  const { items } = req.body;

  console.log("Controllo carrello per items:", items);

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items array richiesto",
    });
  }

  // Costruisci query per controllare tutti gli items
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

  console.log("Query SQL:", sql);
  console.log("Parametri:", queryParams);

  connection.query(sql, queryParams, (error, results) => {
    if (error) {
      console.error("Errore controllo carrello:", error);
      return res.status(500).json({
        success: false,
        message: "Errore del database",
      });
    }

    console.log("Risultati controllo carrello:", results);

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
});

// Processa ordine (aggiorna stock)
router.post("/process-order", (req, res) => {
  const { items, orderInfo } = req.body;

  console.log("=== INIZIO PROCESSAMENTO ORDINE ===");
  console.log("Items ricevuti:", JSON.stringify(items, null, 2));
  console.log("Order info:", JSON.stringify(orderInfo, null, 2));

  if (!Array.isArray(items) || items.length === 0) {
    console.error("Items array mancante o vuoto");
    return res.status(400).json({
      success: false,
      message: "Items array richiesto",
    });
  }

  // Inizia transazione
  connection.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error("Errore inizio transazione:", transactionError);
      return res.status(500).json({
        success: false,
        message: "Errore transazione",
      });
    }

    console.log("Transazione iniziata, processando items...");

    // Funzione per processare ogni item sequenzialmente
    const processItems = (itemIndex = 0) => {
      if (itemIndex >= items.length) {
        // Tutti gli item processati, fai commit
        connection.commit((commitError) => {
          if (commitError) {
            console.error("Errore commit:", commitError);
            return connection.rollback(() => {
              res.status(500).json({
                success: false,
                message: "Errore commit transazione",
              });
            });
          }

          console.log("=== ORDINE COMPLETATO CON SUCCESSO ===");
          res.json({
            success: true,
            message: "Ordine processato con successo",
            orderId: Date.now(), // Genera un ID temporaneo
            itemsProcessed: items.length,
            totalAmount: orderInfo.amount || 0,
          });
        });
        return;
      }

      const item = items[itemIndex];
      console.log(`--- Processando item ${itemIndex + 1}/${items.length} ---`);
      console.log("Item corrente:", item);

      // Validation item
      if (!item.productId || !item.size || !item.quantity) {
        console.error("Item non valido:", item);
        return connection.rollback(() => {
          res.status(400).json({
            success: false,
            message: `Item ${
              itemIndex + 1
            } non valido: mancano productId, size o quantity`,
          });
        });
      }

      // Controlla stock attuale con LOCK per evitare race conditions
      const checkSql = `
        SELECT quantity 
        FROM deposit_product 
        WHERE product_id = ? AND size = ?
        FOR UPDATE
      `;

      connection.query(
        checkSql,
        [item.productId, item.size],
        (checkError, checkResults) => {
          if (checkError) {
            console.error("Errore controllo stock:", checkError);
            return connection.rollback(() => {
              res.status(500).json({
                success: false,
                message: "Errore controllo stock",
              });
            });
          }

          console.log("Risultati controllo stock:", checkResults);

          if (checkResults.length === 0) {
            console.error(
              `Combinazione prodotto/taglia non trovata: ${item.productId}/${item.size}`
            );
            return connection.rollback(() => {
              res.status(400).json({
                success: false,
                message: `Prodotto ${item.productId} taglia ${item.size} non trovato nell'inventario`,
              });
            });
          }

          const currentStock = checkResults[0].quantity;
          console.log(
            `Stock attuale per ${item.productId}-${item.size}: ${currentStock}`
          );
          console.log(`Quantità richiesta: ${item.quantity}`);

          if (currentStock < item.quantity) {
            console.error(
              `STOCK INSUFFICIENTE: disponibili ${currentStock}, richiesti ${item.quantity}`
            );
            return connection.rollback(() => {
              res.status(400).json({
                success: false,
                message: `Stock insufficiente per prodotto ${item.productId} taglia ${item.size}. Disponibili: ${currentStock}, richiesti: ${item.quantity}`,
              });
            });
          }

          // Aggiorna stock
          const updateSql = `
          UPDATE deposit_product 
          SET quantity = quantity - ? 
          WHERE product_id = ? AND size = ?
        `;

          console.log(
            `Aggiornando stock: -${item.quantity} per ${item.productId}/${item.size}`
          );

          connection.query(
            updateSql,
            [item.quantity, item.productId, item.size],
            (updateError, updateResult) => {
              if (updateError) {
                console.error("Errore aggiornamento stock:", updateError);
                return connection.rollback(() => {
                  res.status(500).json({
                    success: false,
                    message: "Errore aggiornamento stock",
                  });
                });
              }

              console.log(
                `Stock aggiornato con successo. Righe modificate: ${updateResult.affectedRows}`
              );
              console.log(
                `Nuovo stock per ${item.productId}-${item.size}: ${
                  currentStock - item.quantity
                }`
              );

              // Processa il prossimo item
              processItems(itemIndex + 1);
            }
          );
        }
      );
    };

    // Inizia il processamento del primo item
    processItems();
  });
});

module.exports = router;
