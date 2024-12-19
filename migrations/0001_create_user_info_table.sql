-- CreateTable UserInformation
CREATE TABLE "UserInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tgid" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_id_key" ON "UserInfo" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_tgid_key" ON "UserInfo" ("tgid");