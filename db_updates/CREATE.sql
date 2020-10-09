PRAGMA user_version=1;
BEGIN TRANSACTION;

CREATE TABLE "channels" (
    "channel_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_name" TEXT DEFAULT "",
    "date_created" INTEGER DEFAULT NULL
);

CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT DEFAULT "",
    "date_joined" INTEGER DEFAULT NULL,
    "role" TEXT DEFAULT ""
);

CREATE TABLE "posts_links" (
    "link_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT DEFAULT "",
    "user_id" TEXT DEFAULT "",
    "post_count" INTEGER DEFAULT 0
);

COMMIT TRANSACTION;