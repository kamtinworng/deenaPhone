-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('pending', 'paid', 'overdue');

-- CreateEnum
CREATE TYPE "statusInstallmentPayment" AS ENUM ('inProgress', 'Hold', 'Cancel', 'Success');

-- CreateEnum
CREATE TYPE "choice" AS ENUM ('cashPayment', 'bankTransferPayment');

-- CreateEnum
CREATE TYPE "productStatus" AS ENUM ('ForSale', 'SoldOut');

-- CreateEnum
CREATE TYPE "typeBlog" AS ENUM ('news', 'promotion');

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "deviceName" TEXT NOT NULL,
    "deviceDetail" TEXT NOT NULL,
    "indentifier" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "numberOfInstallments" TEXT NOT NULL,
    "installmentAmount" INTEGER NOT NULL,
    "icloud" TEXT,
    "passwordIcloud" TEXT,
    "lockscreen" TEXT,
    "idLoad" TEXT,
    "passwordIdLoad" TEXT,
    "status" "productStatus" NOT NULL DEFAULT 'ForSale',
    "branchId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installmentPayments" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "productsId" TEXT NOT NULL,
    "paidInstallments" INTEGER NOT NULL,
    "remainingAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerName" TEXT NOT NULL,
    "facebookLink" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "downPaymentChoice" "choice" NOT NULL,
    "paymentAgreementFile" TEXT NOT NULL,
    "deviceImeiImageFile" TEXT NOT NULL,
    "idCardImage" TEXT NOT NULL,
    "houseRegistrationImage" TEXT NOT NULL,
    "customerReceivingImage" TEXT NOT NULL,
    "statusInstallmentPayment" "statusInstallmentPayment" NOT NULL DEFAULT 'inProgress',
    "receiptImage" TEXT[],
    "over" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "installmentPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dueDates" (
    "id" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'pending',
    "updatedAt" TIMESTAMP(3),
    "pricePaid" INTEGER NOT NULL,
    "installmentPaymentsId" TEXT,

    CONSTRAINT "dueDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeLineInstallmentPayment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "installmentPaymentsId" TEXT NOT NULL,

    CONSTRAINT "timeLineInstallmentPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "typeBlog" "typeBlog" NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_code_key" ON "Branch"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_id_code_key" ON "Branch"("id", "code");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installmentPayments" ADD CONSTRAINT "installmentPayments_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dueDates" ADD CONSTRAINT "dueDates_installmentPaymentsId_fkey" FOREIGN KEY ("installmentPaymentsId") REFERENCES "installmentPayments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeLineInstallmentPayment" ADD CONSTRAINT "timeLineInstallmentPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeLineInstallmentPayment" ADD CONSTRAINT "timeLineInstallmentPayment_installmentPaymentsId_fkey" FOREIGN KEY ("installmentPaymentsId") REFERENCES "installmentPayments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
