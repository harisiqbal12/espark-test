-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "author_id" TEXT;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
