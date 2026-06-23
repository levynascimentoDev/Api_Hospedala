/*
  Warnings:

  - A unique constraint covering the columns `[accommodation_id]` on the table `AddressAccommodation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AddressAccommodation_accommodation_id_key` ON `AddressAccommodation`(`accommodation_id`);

-- AddForeignKey
ALTER TABLE `AddressAccommodation` ADD CONSTRAINT `AddressAccommodation_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
