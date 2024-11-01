/*
  Warnings:

  - Added the required column `icloudPhoneNumber` to the `installmentPayments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `installmentPayments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenId` to the `installmentPayments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeCode` to the `installmentPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "installmentPayments" ADD COLUMN     "icloudPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "recipientId" TEXT NOT NULL,
ADD COLUMN     "screenId" TEXT NOT NULL,
ADD COLUMN     "timeCode" TEXT NOT NULL;
