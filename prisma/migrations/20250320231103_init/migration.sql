-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "subscriberType" TEXT NOT NULL,
    "holdingType" TEXT,
    "entityFile" TEXT,
    "custodianCheck" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);
