-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Polo & T-shirt','URL_DA_MODIFICARE','Polo e magliette casual e sportive'),(2,'Capispalla','URL_DA_MODIFICARE','Giubbotti, piumini e cappotti'),(3,'Felpe','URL_DA_MODIFICARE','Felpe e maglioni per tutte le stagioni'),(4,'Pantaloni','URL_DA_MODIFICARE','Pantaloni casual e eleganti'),(5,'Scarpe','URL_DA_MODIFICARE','Sneaker e calzature sportive'),(6,'Streetwear','URL_DA_MODIFICARE','Abbigliamento urban e di tendenza');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `category_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
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
  `deposit_id` bigint NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `deposit_id` (`deposit_id`),
  CONSTRAINT `deposit_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `deposit_product_ibfk_2` FOREIGN KEY (`deposit_id`) REFERENCES `deposits` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit_product`
--

LOCK TABLES `deposit_product` WRITE;
/*!40000 ALTER TABLE `deposit_product` DISABLE KEYS */;
INSERT INTO `deposit_product` VALUES (59,1,1,'M','Navy'),(60,1,1,'L','White'),(61,1,2,'S','Navy'),(62,1,3,'XL','Black'),(63,2,1,'M','Black'),(64,2,2,'L','Navy'),(65,2,4,'XL','Grey'),(66,3,1,'S','White'),(67,3,2,'M','Black'),(68,3,3,'L','Grey'),(69,4,1,'M','Black'),(70,4,2,'L','Navy'),(71,5,1,'32','Beige'),(72,5,2,'34','Navy'),(73,5,3,'36','Black'),(74,6,1,'42','White/Blue'),(75,6,2,'43','Grey/White'),(76,6,4,'41','Black/White'),(77,7,1,'M','Olive'),(78,7,3,'L','Black'),(79,8,1,'S','White'),(80,8,2,'M','Navy'),(81,8,4,'L','Red'),(82,9,2,'M','White'),(83,9,3,'L','Blue'),(84,10,1,'S','Black'),(85,10,4,'M','White'),(86,11,1,'M','Navy'),(87,11,2,'L','Black');
/*!40000 ALTER TABLE `deposit_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposits`
--

DROP TABLE IF EXISTS `deposits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposits` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` smallint DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
INSERT INTO `deposits` VALUES (1,1000,'deposito.milano@store.com'),(2,800,'deposito.roma@store.com'),(3,600,'deposito.napoli@store.com'),(4,500,'deposito.torino@store.com');
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;
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
  `sku_order_code` varchar(255) DEFAULT NULL,
  `free` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
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
  `customer_id` bigint NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `order_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
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
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `brand` varchar(255) DEFAULT NULL,
  `sku_order_code` varchar(255) DEFAULT NULL,
  `fabric` varchar(255) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `start_discount` datetime DEFAULT NULL,
  `end_discount` datetime DEFAULT NULL,
  `is_active_product` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku_order_code` (`sku_order_code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Polo Classic','Polo classica Fred Perry',89.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','FRED PERRY','FP001','Cotton 100%',10.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(2,'Giubbotto Invernale','Giubbotto sportivo Barrow',159.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','BARROW','BR002','Polyester/Nylon',15.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(3,'Felpa Logo','Felpa con logo Department Five',129.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','DEPARTMENT FIVE','D5003','Cotton/Polyester',20.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(4,'Piumino Premium','Piumino elegante Herno',299.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','HERNO','HN004','Nylon/Down',12.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(5,'Pantalone Chino','Pantalone chino Dondup',149.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','DONDUP','DD005','Cotton/Elastane',15.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(6,'Sneaker Tropez','Sneaker Philippe Model Tropez',189.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','PHILIPPE MODEL','PM006','Leather/Suede',10.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(7,'Felpa Goggle','Felpa con lenti C.P. Company',179.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','C.P. COMPANY','CP007','Cotton/Polyester',12.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(8,'Polo Big Pony','Polo Ralph Lauren Big Pony',99.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','POLO RALPH LAUREN','RL008','Cotton Pique',10.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(9,'T-shirt Logo','T-shirt Saint Barth',69.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','SAINT BARTH','SB009','Cotton 100%',15.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(10,'Felpa Oversize','Felpa oversize GCDS',139.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','GCDS','GC010','Cotton/Polyester',18.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1),(11,'Maglione Badge','Maglione con badge Stone Island',219.99,'URL_DA_MODIFICARE','2025-05-22 14:50:37','STONE ISLAND','SI011','Wool/Cotton',8.00,'2024-01-01 00:00:00','2024-01-31 00:00:00',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 15:10:21


