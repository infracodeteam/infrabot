BEGIN TRANSACTION;

CREATE TABLE "versions" (
    "module_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "module_name" TEXT DEFAULT "",
    "version" TEXT DEFAULT ""
);
INSERT INTO versions (module_name, version) VALUES ("infrabot", "1.0.0");

CREATE TABLE "channels" (
    "channel_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_name" TEXT DEFAULT "",
    "date_created" INTEGER DEFAULT NULL
);

CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT DEFAULT "",
    "date_joined" INTEGER DEFAULT NULL
);

COMMIT TRANSACTION;