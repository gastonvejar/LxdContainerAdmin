CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	`password` varchar(100) NOT NULL,
	`created_date` TIMESTAMP NOT NULL,
	`deleted_date` TIMESTAMP,
	`deleted_flag` bool NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `containers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`image_id` INT NOT NULL,
	`name` varchar(100) NOT NULL,
	`status` varchar(50) NOT NULL,
	`created_date` TIMESTAMP NOT NULL,
	`deleted_date` TIMESTAMP,
	`deleted_flag` bool NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `snapshots` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`container_id` INT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255),
	`created_date` TIMESTAMP NOT NULL,
	`deleted_date` TIMESTAMP,
	`deleted_flag` bool NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `images` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL UNIQUE,
	`description` varchar(255) NOT NULL,
	`distribution` varchar(50) NOT NULL,
	`version` varchar(50) NOT NULL,
	`architecture` varchar(50) NOT NULL,
	`created_date` TIMESTAMP NOT NULL,
	`deleted_date` TIMESTAMP,
	`deleted_flag` bool NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `containers` ADD CONSTRAINT `containers_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `containers` ADD CONSTRAINT `containers_fk1` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`);

ALTER TABLE `snapshots` ADD CONSTRAINT `snapshots_fk0` FOREIGN KEY (`container_id`) REFERENCES `containers`(`id`);

