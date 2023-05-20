CREATE DATABASE  IF NOT EXISTS `ColorRecogniserDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ColorRecogniserDB`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: ColorRecogniserDB
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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
-- Table structure for table `Color`
--

DROP TABLE IF EXISTS `Color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Color` (
  `id` bigint NOT NULL,
  `blue` smallint NOT NULL,
  `green` smallint NOT NULL,
  `name` varchar(255) NOT NULL,
  `red` smallint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_Color_name_red_green_blue` (`name`,`red`,`green`,`blue`),
  UNIQUE KEY `UK_h9k6ljn56q4ga4tv1hyuxtgnm` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Color`
--

LOCK TABLES `Color` WRITE;
/*!40000 ALTER TABLE `Color` DISABLE KEYS */;
/*!40000 ALTER TABLE `Color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Color_SEQ`
--

DROP TABLE IF EXISTS `Color_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Color_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Color_SEQ`
--

LOCK TABLES `Color_SEQ` WRITE;
/*!40000 ALTER TABLE `Color_SEQ` DISABLE KEYS */;
INSERT INTO `Color_SEQ` VALUES (1);
/*!40000 ALTER TABLE `Color_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OneOffScript`
--

DROP TABLE IF EXISTS `OneOffScript`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OneOffScript` (
  `id` bigint NOT NULL,
  `insertedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` varchar(255) NOT NULL,
  `insertedBy_id` bigint DEFAULT NULL,
  `updatedBy_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp0ms2u5qhvvr4tb748xkyyi0m` (`insertedBy_id`),
  KEY `FKf1sb0wtvafd3224cr85euxrbf` (`updatedBy_id`),
  CONSTRAINT `FKf1sb0wtvafd3224cr85euxrbf` FOREIGN KEY (`updatedBy_id`) REFERENCES `User` (`id`),
  CONSTRAINT `FKp0ms2u5qhvvr4tb748xkyyi0m` FOREIGN KEY (`insertedBy_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OneOffScript`
--

LOCK TABLES `OneOffScript` WRITE;
/*!40000 ALTER TABLE `OneOffScript` DISABLE KEYS */;
/*!40000 ALTER TABLE `OneOffScript` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OneOffScript_SEQ`
--

DROP TABLE IF EXISTS `OneOffScript_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OneOffScript_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OneOffScript_SEQ`
--

LOCK TABLES `OneOffScript_SEQ` WRITE;
/*!40000 ALTER TABLE `OneOffScript_SEQ` DISABLE KEYS */;
INSERT INTO `OneOffScript_SEQ` VALUES (1);
/*!40000 ALTER TABLE `OneOffScript_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TestingModel`
--

DROP TABLE IF EXISTS `TestingModel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TestingModel` (
  `id` bigint NOT NULL,
  `longNameField` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TestingModel`
--

LOCK TABLES `TestingModel` WRITE;
/*!40000 ALTER TABLE `TestingModel` DISABLE KEYS */;
/*!40000 ALTER TABLE `TestingModel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TestingModel_SEQ`
--

DROP TABLE IF EXISTS `TestingModel_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TestingModel_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TestingModel_SEQ`
--

LOCK TABLES `TestingModel_SEQ` WRITE;
/*!40000 ALTER TABLE `TestingModel_SEQ` DISABLE KEYS */;
INSERT INTO `TestingModel_SEQ` VALUES (1);
/*!40000 ALTER TABLE `TestingModel_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Token`
--

DROP TABLE IF EXISTS `Token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Token` (
  `id` bigint NOT NULL,
  `expired` tinyint(1) NOT NULL DEFAULT '0',
  `revoked` tinyint(1) NOT NULL DEFAULT '0',
  `token` varchar(255) NOT NULL,
  `userId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_3wi2t4g8oiplxjflw3o2lkv2y` (`token`),
  KEY `FKsalh9bieyp99vt4lw0hd75x8k` (`userId`),
  CONSTRAINT `FKsalh9bieyp99vt4lw0hd75x8k` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Token`
--

LOCK TABLES `Token` WRITE;
/*!40000 ALTER TABLE `Token` DISABLE KEYS */;
INSERT INTO `Token` VALUES (1,0,0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZW5fYWRtaW4iLCJpYXQiOjE2ODQ2MjE3OTIsImV4cCI6MTY4NDcwODE5Mn0.X-RukinjLt3jen9UsK7u_-V9NoXB8LlmW94cyQuTZVc',1);
/*!40000 ALTER TABLE `Token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Token_SEQ`
--

DROP TABLE IF EXISTS `Token_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Token_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Token_SEQ`
--

LOCK TABLES `Token_SEQ` WRITE;
/*!40000 ALTER TABLE `Token_SEQ` DISABLE KEYS */;
INSERT INTO `Token_SEQ` VALUES (51);
/*!40000 ALTER TABLE `Token_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userStatus` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'INACTIVE',
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_e6gkqunxajvyxl5uctpl2vl2p` (`email`),
  UNIQUE KEY `UK_jreodf78a7pl5qidfh43axdfb` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'yenngo20199@gmail.com','$2a$10$MbtP1oLqC.x.T4X0Cakei.qBykMrCvnN/WYPH5Giexn17gfai5DMO','INACTIVE','yen_admin');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserRole`
--

DROP TABLE IF EXISTS `UserRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserRole` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  KEY `FKaylrm89oaj25hficd4a5hbgub` (`id`),
  CONSTRAINT `FKaylrm89oaj25hficd4a5hbgub` FOREIGN KEY (`id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserRole`
--

LOCK TABLES `UserRole` WRITE;
/*!40000 ALTER TABLE `UserRole` DISABLE KEYS */;
INSERT INTO `UserRole` VALUES (1,'USER');
/*!40000 ALTER TABLE `UserRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_SEQ`
--

DROP TABLE IF EXISTS `User_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_SEQ`
--

LOCK TABLES `User_SEQ` WRITE;
/*!40000 ALTER TABLE `User_SEQ` DISABLE KEYS */;
INSERT INTO `User_SEQ` VALUES (51);
/*!40000 ALTER TABLE `User_SEQ` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-21  8:54:58
