-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.27-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych the_budget
CREATE DATABASE IF NOT EXISTS `the_budget` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `the_budget`;

-- Zrzut struktury tabela the_budget.budget
CREATE TABLE IF NOT EXISTS `budget` (
  `budget` decimal(11,2) unsigned NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli the_budget.budget: ~0 rows (około)
INSERT INTO `budget` (`budget`) VALUES
	(7700.43);

-- Zrzut struktury tabela the_budget.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(50) NOT NULL,
  `is_deletable` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli the_budget.category: ~5 rows (około)
INSERT INTO `category` (`id`, `name`, `is_deletable`) VALUES
	('1a348d5c-d57a-11ed-b92a-18c04d0ba583', 'Chemistry', 0),
	('41dffb8b-d651-11ed-b92a-18c04d0ba583', 'Electronics', 0),
	('e897e925-d640-11ed-b92a-18c04d0ba583', 'Medicines', 0),
	('uuid-category-001', 'Food', 0),
	('uuid-category-002', 'Transport', 0);

-- Zrzut struktury tabela the_budget.expense
CREATE TABLE IF NOT EXISTS `expense` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `date` date NOT NULL,
  `price` decimal(9,2) unsigned NOT NULL,
  `index_id` varchar(36) NOT NULL,
  `place` varchar(36) NOT NULL,
  `fill_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_expense_index` (`index_id`),
  KEY `FK_expense_place` (`place`),
  CONSTRAINT `FK_expense_index` FOREIGN KEY (`index_id`) REFERENCES `index` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_expense_place` FOREIGN KEY (`place`) REFERENCES `place` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli the_budget.expense: ~7 rows (około)
INSERT INTO `expense` (`id`, `date`, `price`, `index_id`, `place`, `fill_date`) VALUES
	('0ed56bf1-e027-475f-b41c-0dfc4970515e', '2023-04-06', 4.00, '83b87aa6-d245-11ed-8f92-18c04d0ba583', 'ca29bda3-d310-11ed-8f92-18c04d0ba583', '2023-04-06 18:20:37'),
	('14019b45-6b0e-4677-b52a-65ea1af4b24c', '2023-04-07', 20.00, 'ddbba8d4-d57b-11ed-b92a-18c04d0ba583', 'uuid-place-001', '2023-04-07 19:39:30'),
	('44e4e765-80bf-4850-88e3-cdd95eec2e6f', '2023-04-08', 3500.00, '48a7683b-d651-11ed-b92a-18c04d0ba583', '5645a77f-d651-11ed-b92a-18c04d0ba583', '2023-04-08 21:07:22'),
	('498dbf54-6c6e-4ca8-8565-1538c2bd77ca', '2023-04-06', 34.00, '1e81a8bc-d242-11ed-8f92-18c04d0ba583', 'f7cc2a08-d18f-11ed-8f92-18c04d0ba583', '2023-04-06 18:20:47'),
	('6d0acfa3-8c35-4701-b4d2-c159503d3f1a', '2023-04-07', 225.00, 'b8f89dc1-d241-11ed-8f92-18c04d0ba583', 'ca29bda3-d310-11ed-8f92-18c04d0ba583', '2023-04-07 13:52:22'),
	('6e47f880-0966-4998-8ada-73a82ad4a1a9', '2023-04-08', 12.00, 'f4f0c2d1-d640-11ed-b92a-18c04d0ba583', 'uuid-place-001', '2023-04-08 19:10:08'),
	('7357b6c7-35d9-4f06-9789-d109cd0e2a66', '2023-04-07', 5.00, '2b0291a4-d243-11ed-8f92-18c04d0ba583', 'ca29bda3-d310-11ed-8f92-18c04d0ba583', '2023-04-07 13:47:13');

-- Zrzut struktury tabela the_budget.index
CREATE TABLE IF NOT EXISTS `index` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `name` varchar(50) NOT NULL,
  `category` varchar(36) NOT NULL,
  `is_deletable` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK_index_category` (`category`),
  CONSTRAINT `FK_index_category` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli the_budget.index: ~11 rows (około)
INSERT INTO `index` (`id`, `name`, `category`, `is_deletable`) VALUES
	('1c079164-d247-11ed-8f92-18c04d0ba583', 'Pomidor luz', 'uuid-category-001', 1),
	('1cddc72e-d186-11ed-8f92-18c04d0ba583', 'Mleko UHT 0,5% 1l', 'uuid-category-001', 1),
	('1e81a8bc-d242-11ed-8f92-18c04d0ba583', 'Szparagi 250g', 'uuid-category-001', 0),
	('2b0291a4-d243-11ed-8f92-18c04d0ba583', 'Twix 43g', 'uuid-category-001', 0),
	('41279e1f-d190-11ed-8f92-18c04d0ba583', 'Banan luz', 'uuid-category-001', 1),
	('48a7683b-d651-11ed-b92a-18c04d0ba583', 'iPhone 11', '41dffb8b-d651-11ed-b92a-18c04d0ba583', 0),
	('83b87aa6-d245-11ed-8f92-18c04d0ba583', 'Myjnia Seat', 'uuid-category-002', 0),
	('8aa98e77-d247-11ed-8f92-18c04d0ba583', 'Warzywa na patelnię 400g', 'uuid-category-001', 1),
	('b8f89dc1-d241-11ed-8f92-18c04d0ba583', 'Ropa Seat', 'uuid-category-002', 0),
	('ddbba8d4-d57b-11ed-b92a-18c04d0ba583', 'Domestos 1l', '1a348d5c-d57a-11ed-b92a-18c04d0ba583', 0),
	('f4f0c2d1-d640-11ed-b92a-18c04d0ba583', 'Apap 12 szt', 'e897e925-d640-11ed-b92a-18c04d0ba583', 0),
	('uuid-index-002', 'Makaron Pastani', 'uuid-category-001', 1);

-- Zrzut struktury tabela the_budget.place
CREATE TABLE IF NOT EXISTS `place` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(50) NOT NULL,
  `is_deletable` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli the_budget.place: ~7 rows (około)
INSERT INTO `place` (`id`, `name`, `is_deletable`) VALUES
	('0a15b702-d178-11ed-8f92-18c04d0ba583', 'Lewiatan', 1),
	('5645a77f-d651-11ed-b92a-18c04d0ba583', 'iSpot', 0),
	('c29a68dd-d57c-11ed-b92a-18c04d0ba583', 'Media Expert', 1),
	('ca29bda3-d310-11ed-8f92-18c04d0ba583', 'Shell', 0),
	('f5a8fbac-d23b-11ed-8f92-18c04d0ba583', 'Makro', 1),
	('f7cc2a08-d18f-11ed-8f92-18c04d0ba583', 'Dino', 0),
	('uuid-place-001', 'Biedronka', 0);

-- Zrzut struktury wyzwalacz the_budget.is_deletable_category_trigger_after_delete_to_index
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `is_deletable_category_trigger_after_delete_to_index` AFTER DELETE ON `index`
FOR EACH ROW UPDATE `category`
SET `is_deletable` = (SELECT 
CASE 
WHEN COUNT(`index`.`category`) > 0 THEN 0
ELSE 1
END

FROM  `index`
WHERE `index`.`category` = OLD.`category`)

WHERE `category`.`id`=OLD.`category`//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Zrzut struktury wyzwalacz the_budget.is_deletable_category_trigger_after_insert_to_index
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `is_deletable_category_trigger_after_insert_to_index` AFTER INSERT ON `index`
FOR EACH ROW UPDATE `category`
SET `is_deletable` = (SELECT 
CASE 
WHEN COUNT(`index`.`category`) > 0 THEN 0
ELSE 1
END

FROM  `index`
WHERE `index`.`category` = NEW.`category`)

WHERE `category`.`id`=NEW.`category`//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Zrzut struktury wyzwalacz the_budget.is_deletable_index_trigger_after_delete_to_expense
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `is_deletable_index_trigger_after_delete_to_expense` AFTER DELETE ON `expense`
FOR EACH ROW UPDATE `index`
SET `is_deletable` = (
SELECT

CASE
	WHEN COUNT(`expense`.`index_id`) > 0 THEN 0
	ELSE 1
END	

FROM `expense`
WHERE `expense`.`index_id`=OLD.`index_id`
)

WHERE `index`.`id`=OLD.`index_id`//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Zrzut struktury wyzwalacz the_budget.is_deletable_index_trigger_after_insert_to_expense
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `is_deletable_index_trigger_after_insert_to_expense` AFTER INSERT ON `expense`
FOR EACH ROW UPDATE `index`
SET `is_deletable` = (
SELECT

CASE
	WHEN COUNT(`expense`.`index_id`) > 0 THEN 0
	ELSE 1
END	

FROM `expense`
WHERE `expense`.`index_id`=NEW.`index_id`
)

WHERE `index`.`id`=NEW.`index_id`//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Zrzut struktury wyzwalacz the_budget.is_deletable_shop_trigger_after_delete_to_expense
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `is_deletable_shop_trigger_after_delete_to_expense` AFTER DELETE ON `expense` FOR EACH ROW UPDATE `place`
SET `is_deletable` = (SELECT

CASE
	WHEN COUNT(`expense`.`place`) > 0 THEN 0
	ELSE 1
END	

FROM `expense`
WHERE `expense`.`place`=OLD.`place`)

WHERE `place`.`id`=OLD.`place`//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Zrzut struktury wyzwalacz the_budget.is_deletable_shop_trigger_after_insert_to_expense
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `is_deletable_shop_trigger_after_insert_to_expense` AFTER INSERT ON `expense` FOR EACH ROW UPDATE `place`
SET `is_deletable` = (SELECT

CASE
	WHEN COUNT(`expense`.`place`) > 0 THEN 0
	ELSE 1
END	

FROM `expense`
WHERE `expense`.`place`=NEW.`place`)

WHERE `place`.`id`=NEW.`place`//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
