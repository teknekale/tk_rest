CREATE DATABASE IF NOT EXISTS rest_server;

USE rest_server;

--
-- Table structure for table `store_lock`
--

DROP TABLE IF EXISTS `store_lock`;

CREATE TABLE `store_lock` (
  `id`          int(11)     NOT NULL AUTO_INCREMENT,
  `user_id`     int(11)     NOT NULL,
  `type_id`     int(11)     NOT NULL,
  `what`        varchar(50) NOT NULL,
  `email`       varchar(50) NOT NULL,
  `password`    varchar(50) NOT NULL,
  `note`        text,
  `date_create` varchar(13),
  `date_edit`   varchar(13),

  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `store_lock`
--

INSERT INTO `store_lock` (`id`, `user_id`, `type_id`, `what`, `email`, `password`, `note`, `date_create`, `date_edit`) VALUES
  (1, 1, 1, 'test', 'asd@asd.com', 'Test321', NULL, 1463056137, 1463056137),
  (2, 1, 2, 'email', 'p.s@asd.com', '123P!', NULL, 1463056137, 1463056137);

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
  `date_create` varchar(13),
  `date_edit`   varchar(13),

  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `nome`, `cognome`, `email`, `password`, `type`, `note`, `date_create`, `date_edit`) VALUES
  (1, 'simone.pachera', 'Simone', 'Pachera', 'pachera.simone@gmail.com', '123Stella', 'A', NULL, 1463056137, 1463056137);

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;

CREATE TABLE `type` (
  `id`          int(11)     NOT NULL AUTO_INCREMENT,
  `type`        varchar(50) NOT NULL,
  `note`        text,
  `date_create` varchar(13),
  `date_edit`   varchar(13),

  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `customers`
--

INSERT INTO `type` (`id`, `type`, `note`, `date_create`, `date_edit`) VALUES
  (1, 'test', NULL , 1463056137, 1463056137),
  (2, 'email', NULL , 1463056137, 1463056137);
