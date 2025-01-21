-- CreateTable
CREATE TABLE "titulos" (
    "nome" VARCHAR(255) NOT NULL,
    "clubeId" TEXT NOT NULL,
    "conquistas" INTEGER NOT NULL,

    CONSTRAINT "titulos_pkey" PRIMARY KEY ("nome","clubeId")
);

-- CreateTable
CREATE TABLE "clubes" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tecnico" VARCHAR(255) NOT NULL,
    "presidente" VARCHAR(255) NOT NULL,
    "anoFundacao" INTEGER NOT NULL,
    "principalRival" VARCHAR(255),
    "estadio" VARCHAR(255) NOT NULL,
    "localizacao" Geometry(Point, 4326) NOT NULL,
    "escudo_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clubes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "titulos" ADD CONSTRAINT "titulos_clubeId_fkey" FOREIGN KEY ("clubeId") REFERENCES "clubes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
