-- CreateTable LastNotices
CREATE TABLE IF NOT EXISTS "LastNotices" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "noticeid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "filepath" TEXT NOT NULL,
    "noticedate" TEXT NOT NULL,
    "sesscode" TEXT,
    "imp" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex LastNotices
CREATE UNIQUE INDEX "LastNotices_id_key" ON "LastNotices" ("id");

-- CreateIndex LastNotices
CREATE UNIQUE INDEX "LastNotices_noticeid_key" ON "LastNotices" ("noticeid");