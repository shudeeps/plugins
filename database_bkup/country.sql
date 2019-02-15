/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.6.12-log : Database - country
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`country` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `country`;

/*Table structure for table `continent` */

DROP TABLE IF EXISTS `continent`;

CREATE TABLE `continent` (
  `continent_id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  KEY `id` (`continent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `continent` */

insert  into `continent`(`continent_id`,`name`) values (2,'europe'),(3,'africa'),(4,'asia');

/*Table structure for table `country_list` */

DROP TABLE IF EXISTS `country_list`;

CREATE TABLE `country_list` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(32) DEFAULT NULL,
  `continent_id` varchar(32) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `country_list` */

insert  into `country_list`(`id`,`country_name`,`continent_id`) values (1,'nepal','4'),(2,'china','4'),(3,'england','2'),(4,'spain','2'),(5,'south africa','3'),(7,'egypt','3');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
