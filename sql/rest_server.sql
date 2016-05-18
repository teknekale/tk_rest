-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2016 at 03:29 PM
-- Server version: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rest_server`
--
CREATE DATABASE IF NOT EXISTS `rest_server` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `rest_server`;

-- --------------------------------------------------------

--
-- Table structure for table `store_lock`
--

DROP TABLE IF EXISTS `store_lock`;
CREATE TABLE `store_lock` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `what` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `note` text COLLATE utf8_bin,
  `date_create` varchar(13) COLLATE utf8_bin DEFAULT NULL,
  `date_edit` varchar(13) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONS FOR TABLE `store_lock`:
--   `type_id`
--       `type` -> `id`
--   `user_id`
--       `user` -> `id`
--

--
-- Truncate table before insert `store_lock`
--

TRUNCATE TABLE `store_lock`;
--
-- Dumping data for table `store_lock`
--

INSERT INTO `store_lock` VALUES(1, 1, 1, 'test', 'asd@asd.com', 'Test321', '', '1463056137', '1463562500476');
INSERT INTO `store_lock` VALUES(2, 1, 2, 'email', 'p.s@asd.com', '123P!', NULL, '1463056137', '1463056137');
INSERT INTO `store_lock` VALUES(3, 1, 2, 'ff', 'ff@ff.it', 'ff', '', '1463571573271', '1463571576976');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `type` varchar(50) COLLATE utf8_bin NOT NULL,
  `note` text COLLATE utf8_bin,
  `date_create` varchar(13) COLLATE utf8_bin DEFAULT NULL,
  `date_edit` varchar(13) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONS FOR TABLE `type`:
--

--
-- Truncate table before insert `type`
--

TRUNCATE TABLE `type`;
--
-- Dumping data for table `type`
--

INSERT INTO `type` VALUES(1, 'test', NULL, '1463056137', '1463056137');
INSERT INTO `type` VALUES(2, 'email', NULL, '1463056137', '1463056137');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `nome` varchar(50) COLLATE utf8_bin NOT NULL,
  `cognome` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `type` varchar(50) COLLATE utf8_bin NOT NULL,
  `note` text COLLATE utf8_bin,
  `date_create` varchar(13) COLLATE utf8_bin DEFAULT NULL,
  `date_edit` varchar(13) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONS FOR TABLE `user`:
--

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;
--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES(1, 'simone.pachera', 'Simone', 'Pachera', 'pachera.simone@gmail.com', '123Stella', 'A', NULL, '1463056137', '1463056137');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `store_lock`
--
ALTER TABLE `store_lock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `store_lock`
--
ALTER TABLE `store_lock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
