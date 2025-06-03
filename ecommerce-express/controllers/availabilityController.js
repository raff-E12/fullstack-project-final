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
    const { items, orderInfo } = req.body;

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

        const processItems = (itemIndex = 0) => {
            if (itemIndex >= items.length) {
                return connection.commit((commitError) => {
                    if (commitError) {
                        return connection.rollback(() => {
                            res.status(500).json({
                                success: false,
                                message: "Errore commit transazione",
                            });
                        });
                    }

                    res.json({
                        success: true,
                        message: "Ordine processato con successo",
                        orderId: Date.now(),
                        itemsProcessed: items.length,
                        totalAmount: orderInfo.amount || 0,
                    });
                });
            }

            const item = items[itemIndex];

            if (!item.productId || !item.size || !item.quantity) {
                return connection.rollback(() => {
                    res.status(400).json({
                        success: false,
                        message: `Item ${itemIndex + 1
                            } non valido: mancano productId, size o quantity`,
                    });
                });
            }

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
                        return connection.rollback(() => {
                            res.status(500).json({
                                success: false,
                                message: "Errore controllo stock",
                            });
                        });
                    }

                    if (checkResults.length === 0) {
                        return connection.rollback(() => {
                            res.status(400).json({
                                success: false,
                                message: `Prodotto ${item.productId} taglia ${item.size} non trovato nell'inventario`,
                            });
                        });
                    }

                    const currentStock = checkResults[0].quantity;

                    if (currentStock < item.quantity) {
                        return connection.rollback(() => {
                            res.status(400).json({
                                success: false,
                                message: `Stock insufficiente per prodotto ${item.productId} taglia ${item.size}. Disponibili: ${currentStock}, richiesti: ${item.quantity}`,
                            });
                        });
                    }

                    const updateSql = `
            UPDATE deposit_product 
            SET quantity = quantity - ? 
            WHERE product_id = ? AND size = ?
          `;

                    connection.query(
                        updateSql,
                        [item.quantity, item.productId, item.size],
                        (updateError) => {
                            if (updateError) {
                                return connection.rollback(() => {
                                    res.status(500).json({
                                        success: false,
                                        message: "Errore aggiornamento stock",
                                    });
                                });
                            }

                            processItems(itemIndex + 1);
                        }
                    );
                }
            );
        };

        processItems();
    });
};

module.exports = {
    getProductAvailability,
    checkProductAvailability,
    checkCartAvailability,
    processOrder,
};