-- CreateTable
CREATE TABLE "titulos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "conquitas" INTEGER NOT NULL,
    "clubeId" TEXT,

    CONSTRAINT "titulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clubes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tecnico" TEXT NOT NULL,
    "presidente" TEXT NOT NULL,
    "anoFundacao" INTEGER NOT NULL,
    "principalRival" TEXT,
    "estadio" TEXT NOT NULL,
    "localizacao" geometry(Point, 4326) NOT NULL,
    "escudo" TEXT,

    CONSTRAINT "clubes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "titulos" ADD CONSTRAINT "titulos_clubeId_fkey" FOREIGN KEY ("clubeId") REFERENCES "clubes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
