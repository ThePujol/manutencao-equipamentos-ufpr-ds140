CREATE DATABASE  IF NOT EXISTS `manutencao_equipamentos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `manutencao_equipamentos`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: manutencao_equipamentos
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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Notebook',1),(2,'Desktop',1),(3,'Impressora',1),(4,'Mouse',1),(5,'Teclado',1);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `data_nasc` datetime NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (1,'Mario Silva','mario@gmail.com','bU4G0p9Mbt76PGgP+/H2Z05o3Oxq7zIaZ2w6meOJGIw=','gjbjIGzRaqKJsuIuWiOiJA==','1978-04-23 00:00:00',1),(2,'Maria Silva','maria@gmail.com','yzqvFizcumcwO0fBFWTsha/HOSntQGN55WKPblkibyU=','uENFIZghNZvv0uKCEEYNCg==','1988-03-02 00:00:00',1);
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `estado` char(2) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `num` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (2,'viniciuskataguiri@gmail.com','dLNlwGjHyJx8jpssOVWgJ5juVN62Y0lm40hN32xKln0=','8OQgPc7Z3E93jeyfkm7ZgA==','João','43627632742','21872182178','44444444','BA','Santo Antônio de Jesus','Rua Via Coletora B','1',''),(3,'vinicius.perrot@gmail.com','SydzCwY+/lBcnyKg1W/cOUFY9SGDKbgXO7ROXLAod0w=','Jw3bHdqxtxOaI+0xjG0MvQ==','José','34623873287','38274687236','44444444','BA','Santo Antônio de Jesus','Rua Via Coletora B','1',''),(4,'guimenegari27@gmail.com','DaFuJKvzvdKP+OjqS4OO95EPdqmTvsbe7WnfL3lWobc=','6v1jlgekdrhFsr1Pau9DRA==','Joana','42389723987','32487382374','44444444','BA','Santo Antônio de Jesus','Rua Via Coletora B','1',''),(5,'leonardochicora@hotmail.com','dLvjVwBKJT9zweX/zJTgmjin91xtT5s3noFv8TAV13E=','abx+5kKlE07ipjBvvNiUYg==','Joaquina','32176281376','83268172681','44444444','BA','Santo Antônio de Jesus','Rua Via Coletora B','1',''),(6,'diego@gmail.com','WJVXUR4lGJBUDT918RQTqwG7u17t1Tz1EJQa1aGMyc8=','wTTcnRwDtTiuIUZSIgb5GA==','Diego Alves','32498742398','94832723987','44444444','BA','Santo Antônio de Jesus','Rua Via Coletora B','1','');
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacao`
--

DROP TABLE IF EXISTS `solicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitacao` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descricao` text NOT NULL,
  `defeito` text NOT NULL,
  `situacao` enum('ABERTA','ORÇADA','REJEITADA','REDIRECIONADA','APROVADA','ARRUMADA','PAGA','FINALIZADA') NOT NULL DEFAULT 'ABERTA',
  `orcamento` decimal(10,2) DEFAULT NULL,
  `dataOrcamento` datetime DEFAULT NULL,
  `descricaoManutencao` text,
  `dataManutencao` datetime DEFAULT NULL,
  `orientacoes` text,
  `dataFinalizacao` datetime DEFAULT NULL,
  `motivoRejeicao` text,
  `categoria_id` bigint NOT NULL,
  `cliente_id` bigint NOT NULL,
  `funcionario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_solicitacao_categoria` (`categoria_id`),
  KEY `fk_solicitacao_cliente` (`cliente_id`),
  KEY `fk_solicitacao_funcionario` (`funcionario_id`),
  CONSTRAINT `fk_solicitacao_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`),
  CONSTRAINT `fk_solicitacao_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `pessoa` (`id`),
  CONSTRAINT `fk_solicitacao_funcionario` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacao`
--

LOCK TABLES `solicitacao` WRITE;
/*!40000 ALTER TABLE `solicitacao` DISABLE KEYS */;
INSERT INTO `solicitacao` VALUES (1,'Notebook Lenovo','Não liga','ABERTA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,NULL),(2,'Desktop','Sujo','ABERTA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,4,NULL),(3,'Teclado Logitech','Ghosting','ABERTA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,2,NULL),(4,'Mouse Corsair','Sensor não funciona','ABERTA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,5,NULL),(5,'Impressora HP LaserJet','Papel atolado constantemente','ORÇADA',150.00,'2025-04-01 09:00:00',NULL,NULL,NULL,NULL,NULL,3,2,1),(6,'Notebook Dell XPS','Tela quebrada','REJEITADA',800.00,'2025-04-02 10:00:00',NULL,NULL,NULL,NULL,'Cliente não aprovou orçamento',1,3,2),(7,'Desktop Gamer','Travamentos frequentes','REDIRECIONADA',200.00,'2025-04-03 14:00:00',NULL,NULL,NULL,NULL,'Encaminhado a técnico especializado',2,5,1),(8,'Teclado Mecânico','Teclas não funcionam','APROVADA',90.00,'2025-04-04 11:00:00','Substituição de switches',NULL,NULL,NULL,NULL,5,4,2),(9,'Mouse Logitech G502','Botão duplo clicando','ARRUMADA',45.00,'2025-04-05 12:00:00','Reparo no micro switch','2025-04-06 16:00:00',NULL,NULL,NULL,4,6,1),(10,'Impressora Epson','Impressão borrada','PAGA',120.00,'2025-04-07 13:00:00','Troca de cartucho e limpeza','2025-04-08 10:30:00',NULL,NULL,NULL,3,2,2),(11,'Notebook Asus','Bateria não carrega','FINALIZADA',300.00,'2025-04-09 08:00:00','Troca de carregador e bateria','2025-04-10 09:00:00','Evitar uso de carregadores paralelos','2025-04-11 14:00:00',NULL,1,3,1),(12,'Desktop Positivo','Sistema operacional corrompido','FINALIZADA',200.00,'2025-04-12 10:00:00','Formatação e reinstalação do sistema','2025-04-13 15:00:00','Fazer backup regularmente','2025-04-14 17:00:00',NULL,2,4,2),(13,'Mouse Microsoft','Scroll não funciona','ARRUMADA',60.00,'2025-04-15 11:00:00','Reparo no encoder do scroll','2025-04-16 10:00:00',NULL,NULL,NULL,4,5,1),(14,'Teclado Apple','Não conecta via Bluetooth','PAGA',100.00,'2025-04-17 13:00:00','Reparo no módulo Bluetooth','2025-04-18 14:00:00',NULL,NULL,NULL,5,6,2),(15,'Impressora Brother','Erro de papel inexistente','REJEITADA',250.00,'2025-04-19 09:00:00',NULL,NULL,NULL,NULL,'Cliente optou por substituição do equipamento',3,2,1),(16,'Notebook Acer','Superaquecendo','APROVADA',180.00,'2025-04-20 08:30:00','Limpeza interna e troca de pasta térmica',NULL,NULL,NULL,NULL,1,3,2),(17,'Desktop HP','Sem imagem','REDIRECIONADA',160.00,'2025-04-21 12:00:00',NULL,NULL,NULL,NULL,'Encaminhado ao setor de eletrônica',2,4,1),(18,'Teclado Redragon','LEDs apagados','ARRUMADA',70.00,'2025-04-22 09:30:00','Troca do circuito de iluminação','2025-04-23 16:00:00',NULL,NULL,NULL,5,5,2),(19,'Mouse Razer','Desliga sozinho','FINALIZADA',110.00,'2025-04-24 10:30:00','Solda em conector USB','2025-04-25 11:00:00','Evitar dobrar o cabo frequentemente','2025-04-26 13:00:00',NULL,4,6,1),(20,'Notebook Samsung','Sistema lento','PAGA',250.00,'2025-04-27 14:00:00','Upgrade de SSD e memória RAM','2025-04-28 10:00:00',NULL,NULL,NULL,1,2,2);
/*!40000 ALTER TABLE `solicitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacao_status_historico`
--

DROP TABLE IF EXISTS `solicitacao_status_historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitacao_status_historico` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `solicitacao_id` bigint NOT NULL,
  `situacao` varchar(20) NOT NULL,
  `data_hora` datetime NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitacao_id` (`solicitacao_id`),
  CONSTRAINT `solicitacao_status_historico_ibfk_1` FOREIGN KEY (`solicitacao_id`) REFERENCES `solicitacao` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacao_status_historico`
--

LOCK TABLES `solicitacao_status_historico` WRITE;
/*!40000 ALTER TABLE `solicitacao_status_historico` DISABLE KEYS */;
INSERT INTO `solicitacao_status_historico` VALUES (1,1,'ABERTA','2025-03-27 17:28:12','Solicitação criada'),(2,2,'ABERTA','2025-03-28 18:39:43','Solicitação criada'),(3,3,'ABERTA','2025-03-29 12:21:23','Solicitação criada'),(4,4,'ABERTA','2025-03-30 11:23:11','Solicitação criada'),(45,5,'ABERTA','2025-04-01 08:30:00','Solicitação criada'),(46,5,'ORÇADA','2025-04-01 09:00:00','Orçamento enviado'),(47,6,'ABERTA','2025-04-02 09:30:00','Solicitação criada'),(48,6,'ORÇADA','2025-04-02 10:00:00','Orçamento enviado'),(49,6,'REJEITADA','2025-04-02 11:00:00','Cliente rejeitou'),(50,7,'ABERTA','2025-04-03 13:00:00','Solicitação criada'),(51,7,'ORÇADA','2025-04-03 14:00:00','Orçamento enviado'),(52,7,'REDIRECIONADA','2025-04-03 15:00:00','Redirecionado a técnico'),(53,8,'ABERTA','2025-04-04 10:00:00','Solicitação criada'),(54,8,'ORÇADA','2025-04-04 11:00:00','Orçamento enviado'),(55,8,'APROVADA','2025-04-04 12:00:00','Cliente aprovou'),(56,9,'ABERTA','2025-04-05 11:00:00','Solicitação criada'),(57,9,'ORÇADA','2025-04-05 12:00:00','Orçamento enviado'),(58,9,'ARRUMADA','2025-04-06 16:00:00','Serviço concluído'),(59,10,'ABERTA','2025-04-07 12:00:00','Solicitação criada'),(60,10,'ORÇADA','2025-04-07 13:00:00','Orçamento enviado'),(61,10,'ARRUMADA','2025-04-08 10:30:00','Manutenção feita'),(62,10,'PAGA','2025-04-08 14:00:00','Pagamento confirmado'),(63,11,'ABERTA','2025-04-09 08:00:00','Solicitação criada'),(64,11,'FINALIZADA','2025-04-11 14:00:00','Serviço finalizado'),(65,12,'ABERTA','2025-04-12 10:00:00','Solicitação criada'),(66,12,'FINALIZADA','2025-04-14 17:00:00','Serviço finalizado'),(67,13,'ABERTA','2025-04-15 11:00:00','Solicitação criada'),(68,13,'ARRUMADA','2025-04-16 10:00:00','Reparo feito'),(69,14,'ABERTA','2025-04-17 13:00:00','Solicitação criada'),(70,14,'ARRUMADA','2025-04-18 14:00:00','Serviço feito'),(71,14,'PAGA','2025-04-18 17:00:00','Pagamento realizado'),(72,15,'ABERTA','2025-04-19 09:00:00','Solicitação criada'),(73,15,'REJEITADA','2025-04-19 10:00:00','Cliente desistiu'),(74,16,'ABERTA','2025-04-20 08:00:00','Solicitação criada'),(75,16,'ORÇADA','2025-04-20 08:30:00','Orçamento enviado'),(76,16,'APROVADA','2025-04-20 09:00:00','Cliente aprovou'),(77,17,'ABERTA','2025-04-21 12:00:00','Solicitação criada'),(78,17,'REDIRECIONADA','2025-04-21 14:00:00','Encaminhada a eletrônica'),(79,18,'ABERTA','2025-04-22 09:30:00','Solicitação criada'),(80,18,'ARRUMADA','2025-04-23 16:00:00','Serviço concluído'),(81,19,'ABERTA','2025-04-24 10:30:00','Solicitação criada'),(82,19,'FINALIZADA','2025-04-26 13:00:00','Concluído com sucesso'),(83,20,'ABERTA','2025-04-27 14:00:00','Solicitação criada'),(84,20,'PAGA','2025-04-28 12:00:00','Cliente pagou');
/*!40000 ALTER TABLE `solicitacao_status_historico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-26 22:24:04
