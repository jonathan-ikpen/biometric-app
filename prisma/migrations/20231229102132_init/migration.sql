-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "matno" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "yearofstudy" TEXT NOT NULL,
    "yearofgraduation" TEXT NOT NULL,
    "faceUpload" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
