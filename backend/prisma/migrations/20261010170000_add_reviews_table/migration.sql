-- CreateTable
CREATE TABLE IF NOT EXISTS "reviews" (
    "id" VARCHAR(255) NOT NULL,
    "host_id" VARCHAR(255) NOT NULL,
    "raffle_id" VARCHAR(255) NOT NULL,
    "winner_id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'APPROVED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "reviews_winner_id_key" ON "reviews"("winner_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reviews_host_id_idx" ON "reviews"("host_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reviews_raffle_id_idx" ON "reviews"("raffle_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reviews_user_id_idx" ON "reviews"("user_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reviews_host_id_fkey'
    ) THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "host_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reviews_raffle_id_fkey'
    ) THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reviews_winner_id_fkey'
    ) THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "winners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reviews_user_id_fkey'
    ) THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
