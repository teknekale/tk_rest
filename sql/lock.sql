CREATE DATABASE IF NOT EXISTS rest_server;

USE rest_server;

--
-- Table structure for table `store_lock`
--

DROP TABLE IF EXISTS `store_lock`;

CREATE TABLE `store_lock` (
  `id`          int(11)     NOT NULL AUTO_INCREMENT,
  `user_id`     int(11)     NOT NULL,
  `what`        varchar(50) NOT NULL,
  `type`        varchar(50) NOT NULL,
  `email`       varchar(50) NOT NULL,
  `password`    varchar(50) NOT NULL,
  `note`        text,
  `date_create` int(11),
  `date_edit`   int(11),

  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `store_lock`
--

INSERT INTO `store_lock` (`id`, `user_id`, `what`, `type`, `email`, `password`, `note`, `date_create`, `date_edit`) VALUES
(1, 1, 'test', 'test', 'asd@asd.com', 'Test321', NULL, 1463056137, 1463056137);

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id`          int(11)     NOT NULL AUTO_INCREMENT,
  `username`    varchar(50) NOT NULL,
  `nome`        varchar(50) NOT NULL,
  `cognome`     varchar(50) NOT NULL,
  `email`       varchar(50) NOT NULL,
  `password`    varchar(50) NOT NULL,
  `type`        varchar(50) NOT NULL,
  `note`        text,
  `date_create` int(11),
  `date_edit`   int(11),

  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `customers`
--

INSERT INTO `user` (`id`, `username`, `nome`, `cognome`, `email`, `password`, `type`, `note`, `date_create`, `date_edit`) VALUES
(1, 'simone.pachera', 'Simone', 'Pachera', 'pachera.simone@gmail.com', '123Stella', 'A', NULL, 1463056137, 1463056137);
