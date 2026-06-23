/*
  Warnings:

  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `place_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `place_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `services` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `media_places` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `places` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accommodation_id]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accommodation_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodation_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `media_places` DROP FOREIGN KEY `media_places_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_2`;

-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `services_ibfk_1`;

-- DropIndex
DROP INDEX `place_id` ON `reviews`;

-- DropIndex
DROP INDEX `user_id` ON `reviews`;

-- DropIndex
DROP INDEX `place_id` ON `services`;

-- AlterTable
ALTER TABLE `reviews` DROP PRIMARY KEY,
    DROP COLUMN `place_id`,
    DROP COLUMN `rating`,
    DROP COLUMN `user_id`,
    ADD COLUMN `accommodation_id` VARCHAR(35) NOT NULL,
    ADD COLUMN `author_id` VARCHAR(20) NOT NULL,
    ADD COLUMN `content` TEXT NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `services` DROP COLUMN `place_id`,
    DROP COLUMN `type`,
    ADD COLUMN `academy` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `accommodation_id` VARCHAR(35) NOT NULL,
    ADD COLUMN `air` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `grill` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `heater` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hot_hub` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `jacuzzi` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `kitchen` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `parking` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `pool` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tv` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `wifi` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `media_places`;

-- DropTable
DROP TABLE `places`;

-- CreateTable
CREATE TABLE `media_accommodations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accommodationId` VARCHAR(35) NOT NULL,
    `key` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accommodations` (
    `id` VARCHAR(35) NOT NULL,
    `owner_id` VARCHAR(20) NOT NULL,
    `property_type` ENUM('apartamento', 'casa', 'pousada', 'chalê', 'quarto', 'hotel', 'resort') NOT NULL,
    `complete` BOOLEAN NOT NULL DEFAULT false,
    `available` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` MEDIUMTEXT NULL,
    `description` TEXT NULL,
    `price_per_night` DECIMAL(10, 2) NULL,
    `max_guests` INTEGER NULL,
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `rating` DECIMAL(2, 1) NULL,
    `reviewCount` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AddressAccommodation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DECIMAL(10, 8) NULL,
    `lon` DECIMAL(11, 8) NULL,
    `cep` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `address_number` INTEGER NOT NULL,
    `state` CHAR(2) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `accommodation_id` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animals` BOOLEAN NOT NULL,
    `events` BOOLEAN NOT NULL,
    `optional` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `services_accommodation_id_key` ON `services`(`accommodation_id`);

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_accommodations` ADD CONSTRAINT `media_accommodations_ibfk_1` FOREIGN KEY (`accommodationId`) REFERENCES `accommodations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
