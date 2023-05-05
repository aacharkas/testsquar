CREATE UNIQUE INDEX IF NOT EXISTS "active_claim_items_description_unique_key" ON "ClaimItem"("description") WHERE "ClaimItem"."techStatus" = 'ACTIVE';
