-- CreateEnum
CREATE TYPE "ItemsType" AS ENUM ('NEWSPAPER', 'DOCUMENTARIES', 'BOOKS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "type" "ItemsType" NOT NULL,
    "data" TEXT NOT NULL,
    "borrow_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Items_description_key" ON "Items"("description");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_borrow_id_fkey" FOREIGN KEY ("borrow_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
