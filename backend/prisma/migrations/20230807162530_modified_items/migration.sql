-- DropIndex
DROP INDEX "Items_description_key";

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "data" DROP NOT NULL;
