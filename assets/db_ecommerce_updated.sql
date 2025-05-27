-- MySQL dump 10.13  Distrib 8.4.5, for Linux (x86_64)
--
-- Host: localhost    Database: db_ecommerce
-- ------------------------------------------------------
-- Server version	8.4.5-0ubuntu1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `thumbnail_image_url` text,
  `description` text,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Polo & T-shirt','URL_DA_MODIFICARE','Polo e magliette casual e sportive','polo-&-t-shirt'),(2,'Capispalla','URL_DA_MODIFICARE','Giubbotti, piumini e cappotti','capispalla'),(3,'Felpe','URL_DA_MODIFICARE','Felpe e maglioni per tutte le stagioni','felpe'),(4,'Pantaloni','URL_DA_MODIFICARE','Pantaloni casual e eleganti','pantaloni'),(5,'Scarpe','URL_DA_MODIFICARE','Sneaker e calzature sportive','scarpe'),(6,'Streetwear','URL_DA_MODIFICARE','Abbigliamento urban e di tendenza','streetwear');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `billing_address` text,
  `shipping_address` text,
  `phone` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Mario','Rossi','mario.rossi@example.com','Via Roma 10, 00100 Roma','Via Roma 10, 00100 Roma','3331234567','Italy',1),(2,'Laura','Bianchi','laura.bianchi@example.com','Piazza Duomo 1, 20100 Milano','Piazza Duomo 1, 20100 Milano','3457654321','Italy',2),(3,'Giovanni','Verdi','giovanni.verdi@example.com','Corso Francia 5, 10100 Torino','Via Garibaldi 20, 10100 Torino','3209876543','Italy',3),(4,'Anna','Neri','anna.neri@example.com','Viale Colombo 8, 80100 Napoli','Viale Colombo 8, 80100 Napoli','3381122334','Italy',4);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposit_product`
--

DROP TABLE IF EXISTS `deposit_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposit_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `quantity` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `deposit_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit_product`
--

LOCK TABLES `deposit_product` WRITE;
/*!40000 ALTER TABLE `deposit_product` DISABLE KEYS */;
INSERT INTO `deposit_product` VALUES (59,1,'M','Navy',14),(60,1,'L','White',30),(61,1,'S','Navy',22),(62,1,'XL','Black',4),(63,2,'M','Black',11),(64,2,'L','Navy',34),(65,2,'XL','Grey',2),(66,3,'S','White',5),(67,3,'M','Black',14),(68,3,'L','Grey',23),(69,4,'M','Black',2),(70,4,'L','Navy',32),(71,5,'32','Beige',2),(72,5,'34','Navy',3),(73,5,'36','Black',5),(74,6,'42','White/Blue',6),(75,6,'43','Grey/White',4),(76,6,'41','Black/White',2),(77,7,'M','Olive',7),(78,7,'L','Black',3),(79,8,'S','White',12),(80,8,'M','Navy',14),(81,8,'L','Red',23),(82,9,'M','White',22),(83,9,'L','Blue',11),(84,10,'S','Black',8),(85,10,'M','White',21),(86,11,'M','Navy',20);
/*!40000 ALTER TABLE `deposit_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (1,1,1,89.99,1),(2,1,8,89.99,2),(3,2,3,129.99,2),(4,3,5,149.99,4),(5,4,4,299.99,2),(6,5,8,99.99,1);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `order_status` varchar(50) DEFAULT NULL,
  `sku_code` varchar(45) DEFAULT NULL,
  `free_delivery` tinyint DEFAULT NULL,
  `promo_id` bigint DEFAULT NULL,
  `slug` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,179.98,'2025-05-20 10:30:00','Completed','SKU001',0,NULL,'20250520_1'),(2,129.99,'2025-05-21 14:00:00','Processing','SKU002',1,NULL,'20250521_2'),(3,149.99,'2025-05-21 16:45:00','Processing','SKU003',0,NULL,'20250521_3'),(4,299.99,'2025-05-22 09:00:00','Processing','SKU004',1,NULL,'20250522_4'),(5,99.99,'2025-05-22 11:15:00','Completed','SKU005',0,NULL,'20250522_5');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` text,
  `image_still_life_url` text,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `brand` varchar(255) DEFAULT NULL,
  `sku_order_code` varchar(255) DEFAULT NULL,
  `fabric` varchar(255) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `start_discount` datetime DEFAULT NULL,
  `end_discount` datetime DEFAULT NULL,
  `is_visible_product` tinyint(1) DEFAULT '1',
  `category_id` bigint DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku_order_code` (`sku_order_code`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Polo Classic','Polo classica Fred Perry',89.99,'https://www.fredperry.com/media/catalog/product/cache/883c96162990201ebd812695821d9ac0/M/3/M3600_238_V2_BASELINE_FLATFRONT.JPG',NULL,'2025-05-22 14:50:37','FRED PERRY','FP001','Cotton 100%',10.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,1,'fred-perry-polo-classic'),(2,'Giubbotto Invernale','Giubbotto sportivo Barrow',159.99,'https://img01.ztat.net/article/spp-media-p1/3da7c285697d4a78821ab5a9913ed919/36e0b04f92bd4baa9362a289c101f9e1.jpg?imwidth=762&filter=packshot',NULL,'2025-05-22 14:50:37','BARROW','BR002','Polyester/Nylon',15.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,2,'barrow-giubbotto-invernale'),(3,'Felpa Logo','Felpa con logo Department Five',129.99,NULL,NULL,'2025-05-22 14:50:37','DEPARTMENT FIVE','D5003','Cotton/Polyester',20.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,3,'department-five-felpa-logo'),(4,'Piumino Premium','Piumino elegante Herno',299.99,NULL,NULL,'2025-05-22 14:50:37','HERNO','HN004','Nylon/Down',12.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,2,'herno-piumino-premium'),(5,'Pantalone Chino','Pantalone chino Dondup',149.99,NULL,NULL,'2025-05-22 14:50:37','DONDUP','DD005','Cotton/Elastane',15.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,4,'dondup-pantalone-chino'),(6,'Sneaker Tropez','Sneaker Philippe Model Tropez',189.99,NULL,NULL,'2025-05-22 14:50:37','PHILIPPE MODEL','PM006','Leather/Suede',10.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,5,'philippe-model-sneaker-tropez'),(7,'Felpa Goggle','Felpa con lenti C.P. Company',179.99,NULL,NULL,'2025-05-22 14:50:37','C.P. COMPANY','CP007','Cotton/Polyester',12.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,3,'c.p.-company-felpa-goggle'),(8,'Polo Big Pony','Polo Ralph Lauren Big Pony',99.99,NULL,NULL,'2025-05-22 14:50:37','POLO RALPH LAUREN','RL008','Cotton Pique',10.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,1,'polo-ralph-lauren-polo-big-pony'),(9,'T-shirt Logo','T-shirt Saint Barth',69.99,NULL,NULL,'2025-05-22 14:50:37','SAINT BARTH','SB009','Cotton 100%',15.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,1,'saint-barth-t-shirt-logo'),(10,'Felpa Oversize','Felpa oversize GCDS',139.99,NULL,NULL,'2025-05-22 14:50:37','GCDS','GC010','Cotton/Polyester',18.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,3,'gcds-felpa-oversize'),(11,'Maglione Badge','Maglione con badge Stone Island',219.99,NULL,NULL,'2025-05-22 14:50:37','STONE ISLAND','SI011','Wool/Cotton',8.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1,3,'maglione-con-badge-stone-island'),(12,'Pantaloni Cargo','Pantalone Stone Island',188.99,NULL,NULL,'2025-05-22 14:50:37','STONE ISLAND','S1292','Nylon/Down',8.00,'2024-01-01 00:00:00','2024-01-01 00:00:00',1,6,'pantalone-stone-island');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promos`
--

DROP TABLE IF EXISTS `promos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `discount` tinyint DEFAULT NULL,
  `is_valid` tinyint DEFAULT NULL,
  `start_discount` datetime DEFAULT NULL,
  `end_discount` datetime DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promos`
--

LOCK TABLES `promos` WRITE;
/*!40000 ALTER TABLE `promos` DISABLE KEYS */;
INSERT INTO `promos` VALUES (1,10,0,'2024-01-01 00:00:00','2024-03-31 23:59:59','WINTER2024'),(2,15,1,'2025-05-01 09:00:00','2025-12-31 23:59:59','SUMMER2025');
/*!40000 ALTER TABLE `promos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_ecommerce'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-27 12:54:53
