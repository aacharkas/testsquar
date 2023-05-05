-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "active_company_name_unique_key" ON "Company"("name") WHERE "Company"."techStatus" = 'ACTIVE';

CREATE UNIQUE INDEX IF NOT EXISTS "active_insurance_carrier_name_unique_key" ON "InsuranceCarrier"("name") WHERE "InsuranceCarrier"."techStatus" = 'ACTIVE';

CREATE UNIQUE INDEX IF NOT EXISTS "active_customers_display_name_unique_key" ON "Customer"("displayName", "companyId") WHERE "Customer"."techStatus" = 'ACTIVE';
CREATE UNIQUE INDEX IF NOT EXISTS "active_customers_phone_unique_key" ON "Customer"("phone", "companyId") WHERE "Customer"."techStatus" = 'ACTIVE';
CREATE UNIQUE INDEX IF NOT EXISTS "active_customers_email_unique_key" ON "Customer"("email", "companyId") WHERE "Customer"."techStatus" = 'ACTIVE';

CREATE UNIQUE INDEX IF NOT EXISTS "active_unit_of_measuremnt_name_unique_key" ON "UnitOfMeasurement"("name") WHERE "UnitOfMeasurement"."techStatus" = 'ACTIVE';

-- Create extension
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
