-- Dati Aggiuntivi
INSERT INTO category_product (product_id, category_id) VALUES
(1, 1), 
(8, 1), 
(9, 1), 
(2, 2), 
(4, 2), 
(3, 3), 
(7, 3), 
(10, 3), 
(11, 3),
(5, 4), 
(6, 5), 
(2, 6), 
(3, 6), 
(7, 6),
(10, 6);

INSERT INTO customers (name, surname, email, billing_address, shipping_address, phone, country) VALUES
('Mario', 'Rossi', 'mario.rossi@example.com', 'Via Roma 10, 00100 Roma', 'Via Roma 10, 00100 Roma', '3331234567', 'Italy'),
('Laura', 'Bianchi', 'laura.bianchi@example.com', 'Piazza Duomo 1, 20100 Milano', 'Piazza Duomo 1, 20100 Milano', '3457654321', 'Italy'),
('Giovanni', 'Verdi', 'giovanni.verdi@example.com', 'Corso Francia 5, 10100 Torino', 'Via Garibaldi 20, 10100 Torino', '3209876543', 'Italy'),
('Anna', 'Neri', 'anna.neri@example.com', 'Viale Colombo 8, 80100 Napoli', 'Viale Colombo 8, 80100 Napoli', '3381122334', 'Italy');

INSERT INTO orders (customer_id, amount, order_date, order_status) VALUES
(1, 179.98, '2025-05-20 10:30:00', 'Completed'),
(2, 129.99, '2025-05-21 14:00:00', 'Pending'),
(1, 149.99, '2025-05-21 16:45:00', 'Processing'),
(3, 299.99, '2025-05-22 09:00:00', 'Shipped'),
(4, 99.99, '2025-05-22 11:15:00', 'Completed');

INSERT INTO order_product (order_id, product_id, price, quantity, sku_order_code, free) VALUES
(1, 1, 89.99, 1, 'FP001', 0),
(1, 8, 89.99, 1, 'RL008', 0),
(2, 3, 129.99, 1, 'D5003', 0),
(3, 5, 149.99, 1, 'DD005', 0),
(4, 4, 299.99, 1, 'HN004', 0),
(5, 8, 99.99, 1, 'RL008', 0);