-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 10 mrt 2020 om 15:15
-- Serverversie: 10.1.37-MariaDB
-- PHP-versie: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mmcsupport`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `company_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone_number` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `customer`
--

INSERT INTO `customer` (`id`, `name`, `company_name`, `email`, `phone_number`) VALUES
(1, 'hello1', 'hello1', 'hello1', '1023'),
(2, 'hello2', 'hello2', 'hello2', '1233');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `customer_product`
--

CREATE TABLE `customer_product` (
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `customer_product`
--

INSERT INTO `customer_product` (`customer_id`, `product_id`) VALUES
(1, 1),
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `is_archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `product`
--

INSERT INTO `product` (`id`, `name`, `is_archived`) VALUES
(1, 'hel', 0),
(2, 'ha', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `position` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `worktime` float NOT NULL,
  `is_archived` tinyint(1) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `ticket`
--

INSERT INTO `ticket` (`id`, `title`, `description`, `status`, `worktime`, `is_archived`, `date_created`) VALUES
(1, 'hello', 'hello', 1, 0, 0, '2020-03-10'),
(2, 'hello', 'hello', 1, 0, 0, '2020-03-10'),
(3, 'hello', 'hello1', 1, 0, 0, '2020-03-10'),
(4, 'hello', 'hello', 1, 0, 0, '2020-03-10'),
(5, 'hello3', 'hello3', 1, 0, 0, '2020-03-10'),
(6, 'hello4', 'hello5', 1, 0, 0, '2020-03-10');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ticket_customer`
--

CREATE TABLE `ticket_customer` (
  `ticket_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `ticket_customer`
--

INSERT INTO `ticket_customer` (`ticket_id`, `customer_id`) VALUES
(2, 2),
(5, 2),
(6, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ticket_product`
--

CREATE TABLE `ticket_product` (
  `ticket_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `ticket_product`
--

INSERT INTO `ticket_product` (`ticket_id`, `product_id`) VALUES
(2, 1),
(2, 1),
(5, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_ticket`
--

CREATE TABLE `user_ticket` (
  `user_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `customer_product`
--
ALTER TABLE `customer_product`
  ADD KEY `fk_customer_product_id` (`customer_id`,`product_id`) USING BTREE,
  ADD KEY `fk_product_customer_id` (`product_id`);

--
-- Indexen voor tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `ticket_customer`
--
ALTER TABLE `ticket_customer`
  ADD KEY `fk_ticket_customer` (`ticket_id`,`customer_id`),
  ADD KEY `c_fk_customer_ticket_id` (`customer_id`);

--
-- Indexen voor tabel `ticket_product`
--
ALTER TABLE `ticket_product`
  ADD KEY `fk_ticket_product_id` (`ticket_id`,`product_id`),
  ADD KEY `fk_product_ticket_id` (`product_id`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_fk_profiel` (`profile_id`);

--
-- Indexen voor tabel `user_ticket`
--
ALTER TABLE `user_ticket`
  ADD KEY `fk_user_ticket_id` (`user_id`,`ticket_id`),
  ADD KEY `fk_ticket_user_id` (`ticket_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `customer_product`
--
ALTER TABLE `customer_product`
  ADD CONSTRAINT `fk_customer_product_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_customer_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `ticket_customer`
--
ALTER TABLE `ticket_customer`
  ADD CONSTRAINT `c_fk_customer_ticket_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ticket_customer_id` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `ticket_product`
--
ALTER TABLE `ticket_product`
  ADD CONSTRAINT `fk_product_ticket_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ticket_product_id` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_profiel_id` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `user_ticket`
--
ALTER TABLE `user_ticket`
  ADD CONSTRAINT `fk_ticket_user_id` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_ticket_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
