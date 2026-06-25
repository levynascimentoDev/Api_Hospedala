/*
  Warnings:

  - You are about to drop the `media_accommodations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `media_accommodations` DROP FOREIGN KEY `media_accommodations_ibfk_1`;

-- DropTable
DROP TABLE `media_accommodations`;

-- CreateTable
CREATE TABLE `photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accommodationId` VARCHAR(35) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `cover` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `media_accommodations_ibfk_1` FOREIGN KEY (`accommodationId`) REFERENCES `accommodations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
