ALTER TABLE `containers` DROP FOREIGN KEY `containers_fk0`;

ALTER TABLE `containers` DROP FOREIGN KEY `containers_fk1`;

ALTER TABLE `snapshots` DROP FOREIGN KEY `snapshots_fk0`;

DROP TABLE IF EXISTS `users`;

DROP TABLE IF EXISTS `containers`;

DROP TABLE IF EXISTS `snapshots`;

DROP TABLE IF EXISTS `images`;

