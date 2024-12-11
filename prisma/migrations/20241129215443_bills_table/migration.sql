-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "congress" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "originChamber" TEXT NOT NULL,
    "originChamberCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "updateDateIncludingText" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LatestAction" (
    "id" SERIAL NOT NULL,
    "actionDate" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "billId" INTEGER,

    CONSTRAINT "LatestAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_url_key" ON "Bill"("url");

-- CreateIndex
CREATE UNIQUE INDEX "LatestAction_billId_key" ON "LatestAction"("billId");

-- AddForeignKey
ALTER TABLE "LatestAction" ADD CONSTRAINT "LatestAction_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
