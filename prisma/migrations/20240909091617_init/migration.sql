-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100),
    "email" VARCHAR(100),
    "firstname" VARCHAR(50),
    "lastname" VARCHAR(50),
    "password" VARCHAR(30) DEFAULT 'null',
    "provider" TEXT DEFAULT 'credentials',
    "oauth_id" TEXT DEFAULT '0',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
