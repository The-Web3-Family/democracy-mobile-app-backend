-- CreateEnum
CREATE TYPE "Category" AS ENUM ('in_app', 'congress');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'congress',
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "votingClosedDate" TIMESTAMP(3);
