/*
  Warnings:

  - You are about to drop the column `newOption` on the `VoteHistory` table. All the data in the column will be lost.
  - You are about to drop the column `oldOption` on the `VoteHistory` table. All the data in the column will be lost.
  - Added the required column `newOptionId` to the `VoteHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoteHistory" DROP COLUMN "newOption",
DROP COLUMN "oldOption",
ADD COLUMN     "newOptionId" INTEGER NOT NULL,
ADD COLUMN     "oldOptionId" INTEGER;

-- AddForeignKey
ALTER TABLE "VoteHistory" ADD CONSTRAINT "VoteHistory_oldOptionId_fkey" FOREIGN KEY ("oldOptionId") REFERENCES "VotingOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteHistory" ADD CONSTRAINT "VoteHistory_newOptionId_fkey" FOREIGN KEY ("newOptionId") REFERENCES "VotingOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
