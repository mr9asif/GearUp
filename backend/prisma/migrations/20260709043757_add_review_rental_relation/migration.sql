/*
  Warnings:

  - A unique constraint covering the columns `[rentalId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rentalId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "rentalId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_rentalId_key" ON "reviews"("rentalId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
