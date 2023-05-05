CREATE OR REPLACE VIEW "JobListItem" AS SELECT
  "J".id                      AS "id",
  "C"."displayName"           AS "customerName",
  "CA"."formattedAddress"     AS "propertyAddress",
  "IC"."name"                 AS "insuranceCarrierName",
  "J"."claimNumber"           AS "claimNumber",
  "J"."dateOfLoss"            AS "dateOfLoss",

  0                           AS "dueBalance",
  0                           AS "loanBalance",
  0                           AS "sumPaid",
  0                           AS "availableAdvance",
  0                           AS "deductible",

  "J".status                  AS "status",
  "JCI"."customerId"          AS "customerId",
  (ARRAY(
    SELECT "CustomerUser"."userId"
    FROM "CustomerUser"
    WHERE "CustomerUser"."customerId" = "C".id
  ))::character varying[]     AS "responsibleUserIds",
  "C"."companyId"             AS "companyId",
  "IC"."id"                   AS "insuranceCarrierId",

  "J"."versionId"             AS "versionId",
  "J"."createdAt"             AS "createdAt"
FROM
  "Job" AS "J"
JOIN
  "JobCustomerInfo" AS "JCI" ON "JCI"."jobId" = "J"."id"
JOIN
  "Customer" AS "C" ON "JCI"."customerId" = "C"."id"
JOIN
  "Address" AS "CA" ON "CA"."id" = "JCI"."propertyAddressId"
JOIN
  "JobInsuranceCarrierInfo" AS "JICI" ON "JICI"."jobId" = "J"."id"
JOIN
  "InsuranceCarrier" AS "IC" ON "IC"."id" = "JICI"."insuranceCarrierId"
WHERE
  "J"."versionStatus" = 'SUBMITTED' AND
  "J"."id" IN (
    SELECT
	    (SELECT id FROM "Job" WHERE "versionId" = "JVG".id ORDER BY "createdAt" DESC LIMIT 1) as "id"
    FROM "JobVersionGroup" AS "JVG"
  );
