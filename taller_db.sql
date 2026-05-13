-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: taller_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (1,'mecanico');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add servicio',9,'add_servicio'),(26,'Can change servicio',9,'change_servicio'),(27,'Can delete servicio',9,'delete_servicio'),(28,'Can view servicio',9,'view_servicio'),(29,'Can add piloto',8,'add_piloto'),(30,'Can change piloto',8,'change_piloto'),(31,'Can delete piloto',8,'delete_piloto'),(32,'Can view piloto',8,'view_piloto'),(33,'Can add moto',7,'add_moto'),(34,'Can change moto',7,'change_moto'),(35,'Can delete moto',7,'delete_moto'),(36,'Can view moto',7,'view_moto'),(37,'Can add item',10,'add_item'),(38,'Can change item',10,'change_item'),(39,'Can delete item',10,'delete_item'),(40,'Can view item',10,'view_item'),(41,'Can add servicio extra',11,'add_servicioextra'),(42,'Can change servicio extra',11,'change_servicioextra'),(43,'Can delete servicio extra',11,'delete_servicioextra'),(44,'Can view servicio extra',11,'view_servicioextra'),(45,'Can add servicio item',12,'add_servicioitem'),(46,'Can change servicio item',12,'change_servicioitem'),(47,'Can delete servicio item',12,'delete_servicioitem'),(48,'Can view servicio item',12,'view_servicioitem');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1200000$RbdLew5IZHt3QFjznNFuUD$vLk4HpcslynWGCQugjrOhAd7XFylpVcP2LARhcgoMoc=','2026-05-07 06:10:15.914621',1,'admin','Abraham','Velasquez','admin@taller.com',1,1,'2026-05-06 16:44:01.027365'),(2,'pbkdf2_sha256$1200000$IYfhRx3LPZ7H0YPRRKjFkh$qiTklUNaMhvioGcrWRd/c53MzmEav+ivU+ZYVOrPVhA=',NULL,0,'Hestrada','Hector','Estrada','hestrada@mecanico.com',0,1,'2026-05-07 17:09:21.388373'),(3,'pbkdf2_sha256$1200000$6BfcmjwvxYec5Dt4Q8e7lF$PD3NKq2PkNBO5jFX/TqJtQlukXVNkPZU9OrE7nhfLRQ=',NULL,1,'john117','Jefe','Maestro','heiloverde@gmail.com',1,1,'2026-05-11 03:13:56.607233');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
INSERT INTO `auth_user_groups` VALUES (1,2,1);
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_item`
--

DROP TABLE IF EXISTS `core_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_item`
--

LOCK TABLES `core_item` WRITE;
/*!40000 ALTER TABLE `core_item` DISABLE KEYS */;
INSERT INTO `core_item` VALUES (1,'Lavada De Moto','Lavado de Moto Completo','inactivo'),(2,'Mantenimiento Rutinario','','activo'),(3,'Bujias','','activo'),(4,'Radeador','Solo para Motos grandes','activo');
/*!40000 ALTER TABLE `core_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_moto`
--

DROP TABLE IF EXISTS `core_moto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_moto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `modelo` varchar(50) NOT NULL,
  `anio` int NOT NULL,
  `piloto_id` bigint NOT NULL,
  `horas_uso` int NOT NULL,
  `placa` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `placa` (`placa`),
  KEY `core_moto_piloto_id_e879cb0e_fk_core_piloto_id` (`piloto_id`),
  CONSTRAINT `core_moto_piloto_id_e879cb0e_fk_core_piloto_id` FOREIGN KEY (`piloto_id`) REFERENCES `core_piloto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_moto`
--

LOCK TABLES `core_moto` WRITE;
/*!40000 ALTER TABLE `core_moto` DISABLE KEYS */;
INSERT INTO `core_moto` VALUES (1,'NKD',2006,1,0,'ABC123'),(2,'Victory Bomber',2026,2,72,'CDA345'),(3,'Pulsar',2020,4,12500,'ONO123'),(4,'Yamaha',2026,2,12000,'AÑA456');
/*!40000 ALTER TABLE `core_moto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_piloto`
--

DROP TABLE IF EXISTS `core_piloto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_piloto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(254) DEFAULT NULL,
  `cc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cc` (`cc`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_piloto`
--

LOCK TABLES `core_piloto` WRITE;
/*!40000 ALTER TABLE `core_piloto` DISABLE KEYS */;
INSERT INTO `core_piloto` VALUES (1,'Juan Perez','1234567891','juan@gmail.com','123456789'),(2,'Abraham Velasquez','3158884891','abraham.velasquez.f790@gmail.com','6018980'),(3,'Maria Paula Gonzalez Zapata','3023430784','mapita@gmail.com','1053789123'),(4,'Juan David Cifuentes Ocampo','3221234567','juan123@gmail.com','1053812380'),(5,'Daniel Velasquez','3023561234','danivelasquez@gmail.com','675893'),(6,'Juanito Alcachofa','3024567895','juanito@gmail.com','1234789');
/*!40000 ALTER TABLE `core_piloto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_servicio`
--

DROP TABLE IF EXISTS `core_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_servicio` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` datetime(6) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `moto_id` bigint NOT NULL,
  `piloto_id` bigint NOT NULL,
  `horas_servicio` int NOT NULL,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_servicio_moto_id_4519c70a_fk_core_moto_id` (`moto_id`),
  KEY `core_servicio_piloto_id_6e508d56_fk_core_piloto_id` (`piloto_id`),
  CONSTRAINT `core_servicio_moto_id_4519c70a_fk_core_moto_id` FOREIGN KEY (`moto_id`) REFERENCES `core_moto` (`id`),
  CONSTRAINT `core_servicio_piloto_id_6e508d56_fk_core_piloto_id` FOREIGN KEY (`piloto_id`) REFERENCES `core_piloto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_servicio`
--

LOCK TABLES `core_servicio` WRITE;
/*!40000 ALTER TABLE `core_servicio` DISABLE KEYS */;
INSERT INTO `core_servicio` VALUES (1,'2026-05-06 19:36:52.897527','proceso',1,1,2,'alistamiento'),(2,'2026-05-07 17:08:32.715299','terminado',2,2,0,'reparacion'),(3,'2026-05-11 03:20:50.466788','pendiente',3,4,2,'alistamiento'),(4,'2026-05-11 03:39:58.096923','proceso',2,2,1,'reparacion'),(5,'2026-05-11 03:44:25.437530','pendiente',3,4,1,'alistamiento'),(6,'2026-05-11 03:47:49.878636','pendiente',2,2,72,'reparacion');
/*!40000 ALTER TABLE `core_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_servicioextra`
--

DROP TABLE IF EXISTS `core_servicioextra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_servicioextra` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext,
  `servicio_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_servicioextra_servicio_id_57ed0524_fk_core_servicio_id` (`servicio_id`),
  CONSTRAINT `core_servicioextra_servicio_id_57ed0524_fk_core_servicio_id` FOREIGN KEY (`servicio_id`) REFERENCES `core_servicio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_servicioextra`
--

LOCK TABLES `core_servicioextra` WRITE;
/*!40000 ALTER TABLE `core_servicioextra` DISABLE KEYS */;
INSERT INTO `core_servicioextra` VALUES (1,'Mantenimiento Basico','',1);
/*!40000 ALTER TABLE `core_servicioextra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_servicioitem`
--

DROP TABLE IF EXISTS `core_servicioitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_servicioitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `item_id` bigint NOT NULL,
  `servicio_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_servicioitem_servicio_id_item_id_6d88a551_uniq` (`servicio_id`,`item_id`),
  KEY `core_servicioitem_item_id_bf226928_fk_core_item_id` (`item_id`),
  CONSTRAINT `core_servicioitem_item_id_bf226928_fk_core_item_id` FOREIGN KEY (`item_id`) REFERENCES `core_item` (`id`),
  CONSTRAINT `core_servicioitem_servicio_id_8385a05e_fk_core_servicio_id` FOREIGN KEY (`servicio_id`) REFERENCES `core_servicio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_servicioitem`
--

LOCK TABLES `core_servicioitem` WRITE;
/*!40000 ALTER TABLE `core_servicioitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_servicioitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2026-05-06 17:40:42.077532','1','Juan Perez',1,'[{\"added\": {}}]',8,1),(2,'2026-05-06 18:16:54.961876','1','NKD (2006)',1,'[{\"added\": {}}]',7,1),(3,'2026-05-06 19:36:52.899487','1','Servicio 1 - alistamiento',1,'[{\"added\": {}}, {\"added\": {\"name\": \"servicio extra\", \"object\": \"Mantenimiento Basico\"}}]',9,1),(4,'2026-05-06 19:57:35.758153','1','Lavada De Moto',1,'[{\"added\": {}}]',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(10,'core','item'),(7,'core','moto'),(8,'core','piloto'),(9,'core','servicio'),(11,'core','servicioextra'),(12,'core','servicioitem'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-05-06 16:43:00.136150'),(2,'auth','0001_initial','2026-05-06 16:43:01.097050'),(3,'admin','0001_initial','2026-05-06 16:43:01.352337'),(4,'admin','0002_logentry_remove_auto_add','2026-05-06 16:43:01.364760'),(5,'admin','0003_logentry_add_action_flag_choices','2026-05-06 16:43:01.380515'),(6,'contenttypes','0002_remove_content_type_name','2026-05-06 16:43:01.542067'),(7,'auth','0002_alter_permission_name_max_length','2026-05-06 16:43:01.636635'),(8,'auth','0003_alter_user_email_max_length','2026-05-06 16:43:01.676867'),(9,'auth','0004_alter_user_username_opts','2026-05-06 16:43:01.695996'),(10,'auth','0005_alter_user_last_login_null','2026-05-06 16:43:01.787351'),(11,'auth','0006_require_contenttypes_0002','2026-05-06 16:43:01.791569'),(12,'auth','0007_alter_validators_add_error_messages','2026-05-06 16:43:01.804523'),(13,'auth','0008_alter_user_username_max_length','2026-05-06 16:43:01.904297'),(14,'auth','0009_alter_user_last_name_max_length','2026-05-06 16:43:02.007594'),(15,'auth','0010_alter_group_name_max_length','2026-05-06 16:43:02.040877'),(16,'auth','0011_update_proxy_permissions','2026-05-06 16:43:02.055407'),(17,'auth','0012_alter_user_first_name_max_length','2026-05-06 16:43:02.147827'),(18,'sessions','0001_initial','2026-05-06 16:43:02.203743'),(19,'core','0001_initial','2026-05-06 17:01:53.888728'),(20,'core','0002_moto_horas_uso','2026-05-06 18:29:50.975484'),(21,'core','0003_item_remove_servicio_costo_and_more','2026-05-06 18:52:33.623585'),(22,'core','0004_item_estado','2026-05-06 20:01:38.506132'),(23,'core','0005_moto_placa_piloto_cc','2026-05-11 02:35:33.722395');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('duvrhsg04ut9f7thoa5kju240qqkn9g5','.eJxVjEsKwjAUAO_y1hJ8aVLSLt17hvB-tVVJoJ9V8e5S6EK3M8PskGlbx7wtNudJoQeEyy9jkpeVQ-iTyqM6qWWdJ3ZH4k67uHtVe9_O9m8w0jJCD6FrEDuR0MaoGpshcovBJIjnLpkSe2G8YkhDIxKYKBkOPiGSek8Eny_mCDhx:1wKhPK:e5f5qKSuafBCkLj_RBiPDw9h4hYKMtS0nmmygcNrCxo','2026-05-20 18:55:42.858488'),('sll3e84973zfkntf03ch52rgx2is1tlj','.eJxVjEsKwjAUAO_y1hJ8aVLSLt17hvB-tVVJoJ9V8e5S6EK3M8PskGlbx7wtNudJoQeEyy9jkpeVQ-iTyqM6qWWdJ3ZH4k67uHtVe9_O9m8w0jJCD6FrEDuR0MaoGpshcovBJIjnLpkSe2G8YkhDIxKYKBkOPiGSek8Eny_mCDhx:1wKrw7:zJ5uQXPIvOX-wWlKk_Owoi3DVPlPam-PNkU0q191cMs','2026-05-21 06:10:15.917544'),('t5u7pff7udm9ojtnigjokrs108ptkaxn','.eJxVjEsKwjAUAO_y1hJ8aVLSLt17hvB-tVVJoJ9V8e5S6EK3M8PskGlbx7wtNudJoQeEyy9jkpeVQ-iTyqM6qWWdJ3ZH4k67uHtVe9_O9m8w0jJCD6FrEDuR0MaoGpshcovBJIjnLpkSe2G8YkhDIxKYKBkOPiGSek8Eny_mCDhx:1wKfl0:JBNM-UyQ2ZSRDmMdCwrrSueypSpWBOTsLxHGdvb8HO8','2026-05-20 17:09:58.008174');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-11  0:11:59
