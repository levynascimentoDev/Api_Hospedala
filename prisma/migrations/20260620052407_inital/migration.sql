-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(10) NOT NULL,
    `place_id` VARCHAR(10) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `content` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `place_id`(`place_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_places` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` VARCHAR(10) NOT NULL,
    `url` VARCHAR(300) NOT NULL,

    INDEX `place_id`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `places` (
    `id` VARCHAR(10) NOT NULL,
    `title` VARCHAR(20) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `type` VARCHAR(12) NOT NULL,
    `region` VARCHAR(50) NOT NULL,
    `sigla` VARCHAR(2) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `max_people` INTEGER NOT NULL,
    `default_value` DOUBLE NOT NULL,
    `owner_id` INTEGER NOT NULL,
    `lat` VARCHAR(30) NOT NULL,
    `lon` VARCHAR(30) NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `lat`(`lat`),
    UNIQUE INDEX `lon`(`lon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` VARCHAR(10) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `rating` INTEGER NOT NULL,

    INDEX `place_id`(`place_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` VARCHAR(10) NOT NULL,
    `type` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `place_id`(`place_id`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(40) NOT NULL,
    `refresh_token_hash` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expire_at` DATE NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL,
    `given_name` VARCHAR(50) NOT NULL,
    `family_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(300) NULL,
    `birth_date` DATE NOT NULL,
    `role` ENUM('host', 'user', 'admin') NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `media_places` ADD CONSTRAINT `media_places_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
