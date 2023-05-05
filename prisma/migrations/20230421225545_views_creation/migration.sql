CREATE OR REPLACE VIEW "InsuranceScopeListItem" AS
 SELECT "ISD".id,
    "ISD"."dateOfLoss",
    "ISD"."claimNumber",
    "ISD"."totalRcv",
    "ISD".deductible,
    "ISD".status,
    "CD"."displayName" AS "customerName",
    "CD"."propertyAddress",
    "ICD".name AS "insuranceCarrierName",
    "ISD"."companyId",
    "CD"."customerId" AS "customerId",
    "ICD"."insuranceCarrierId" AS "insuranceCarrierId",
    string_to_array("CD"."responsibleUserId", ''::text)::character varying[] AS "responsibleUserIds",
    "ISD"."createdAt",
    "ISD"."updatedAt",
    "ISD"."versionId",
    "C"."displayName" AS "savedCustomerName",
    "CO"."name" AS "companyName"
   FROM "InsuranceScopeDraft" "ISD"
     JOIN "CustomerDraft" "CD" ON "CD"."insuranceScopeDraftId" = "ISD".id
     JOIN "InsuranceCarrierDraft" "ICD" ON "ICD"."insuranceScopeDraftId" = "ISD".id
     JOIN "Customer" "C" ON "C".id = "CD"."customerId"
     JOIN "Company" "CO" ON "CO".id = "ISD"."companyId"
UNION
 SELECT "IS".id,
    "IS"."dateOfLoss",
    "IS"."claimNumber",
    "IS"."totalRcv",
    "IS".deductible,
    "IS".status,
    "C"."displayName" AS "customerName",
    "CA"."formattedAddress" AS "propertyAddress",
    "IC".name AS "insuranceCarrierName",
    "IS"."companyId",
    "C"."id" AS "customerId",
    "IS"."insuranceCarrierId",
    (ARRAY( SELECT "CustomerUser"."userId"
           FROM "CustomerUser"
          WHERE "CustomerUser"."customerId" = "C".id))::character varying[] AS "responsibleUserIds",
    "IS"."createdAt",
    "IS"."updatedAt",
    "IS"."versionId",
    "C"."displayName" AS "savedCustomerName",
    "CO"."name" AS "companyName"
   FROM "InsuranceScope" "IS"
     JOIN "Customer" "C" ON "C".id = "IS"."customerId"
     JOIN "InsuranceCarrier" "IC" ON "IC".id = "IS"."insuranceCarrierId"
     JOIN "Address" "CA" ON "CA".id = "C"."shippingAddressId"
     JOIN "Company" "CO" ON "CO".id = "IS"."companyId";



CREATE OR REPLACE VIEW "InsuranceScopeView" AS
 SELECT "ISD".id,
    "ISD"."claimNumber",
    "ISD"."typeOfLoss",
    "ISD"."dateOfLoss",
    "ISD"."dateInspected",
    "ISD"."dateContacted",
    "ISD"."dateReceived",
    "ISD"."dateEntered",
    "ISD"."policyNumber",
    "ISD"."priceList",
    "ISD".status,
    "ISD"."initialDocumentId",
    "ISD"."initialDocumentName",
    "ISD"."totalLineItems",
    "ISD"."totalTax",
    "ISD"."totalRcv",
    "ISD"."totalAcv",
    "ISD"."totalOverhead",
    "ISD"."totalDepreciation",
    "ISD".deductible,
    "ISD"."netClaimSum",
    "ISD"."totalRecoverableDepreciationSum",
    "ISD"."totalNonRecoverableDepreciationSum",
    "ISD"."netClaimIfDepreciationIsRecovered",
    "ISD"."companyId",
    "CD".id AS "customerId",
    "ICD".id AS "insuranceCarrierId",
    "ISD"."createdAt",
    "ISD"."updatedAt",
    "ISD"."versionId"
   FROM "InsuranceScopeDraft" "ISD"
     JOIN "CustomerDraft" "CD" ON "CD"."insuranceScopeDraftId" = "ISD".id
     JOIN "InsuranceCarrierDraft" "ICD" ON "ICD"."insuranceScopeDraftId" = "ISD".id
UNION
 SELECT "IS".id,
    "IS"."claimNumber",
    "IS"."typeOfLoss",
    "IS"."dateOfLoss",
    "IS"."dateInspected",
    "IS"."dateContacted",
    "IS"."dateReceived",
    "IS"."dateEntered",
    "IS"."policyNumber",
    "IS"."priceList",
    "IS".status,
    "IS"."initialDocumentId",
    "IS"."initialDocumentName",
    "IS"."totalLineItems",
    "IS"."totalTax",
    "IS"."totalRcv",
    "IS"."totalAcv",
    "IS"."totalOverhead",
    "IS"."totalDepreciation",
    "IS".deductible,
    "IS"."netClaimSum",
    "IS"."totalRecoverableDepreciationSum",
    "IS"."totalNonRecoverableDepreciationSum",
    "IS"."netClaimIfDepreciationIsRecovered",
    "IS"."companyId",
    "IS"."customerId",
    "IS"."insuranceCarrierId",
    "IS"."createdAt",
    "IS"."updatedAt",
    "IS"."versionId"
   FROM "InsuranceScope" "IS";

CREATE OR REPLACE VIEW "CustomerView" AS
   SELECT "CD".id,
    "CD"."displayName",
    "CD".type,
    "CD"."firstName",
    "CD"."lastName",
    "CD".email,
    "CD".phone,
    "CD"."propertyAddress",
    "CD"."shippingAddress",
    string_to_array("CD"."responsibleUserId", ''::text)::character varying[] AS "responsibleUserIds",
    "CD"."customerId",
    "CD"."createdAt" AS "createdAt",
    "CD"."updatedAt"
   FROM "CustomerDraft" "CD"
UNION
 SELECT "C".id,
    "C"."displayName",
    "C".type,
    "C"."firstName",
    "C"."lastName",
    "C".email,
    "C".phone,
    "PA"."formattedAddress" AS "propertyAddress",
    "SA"."formattedAddress" AS "shippingAddress",
    (ARRAY( SELECT "CustomerUser"."userId"
           FROM "CustomerUser"
          WHERE "CustomerUser"."customerId" = "C".id))::character varying[] AS "responsibleUserIds",
    NULL::text AS "customerId",
    "C"."createdAt" AS "createdAt",
    "C"."updatedAt"
   FROM "Customer" "C"
     JOIN "Address" "SA" ON "SA".id = "C"."shippingAddressId"
     JOIN "Address" "PA" ON "PA".id = "C"."billingAddressId";

   CREATE OR REPLACE VIEW "InsuranceCarrierAdjusterView" AS
      SELECT "ICA".id,
    "ICA".name,
    "ICA".type,
    "ICA".phone,
    "ICA".email,
    "ICA".address,
    "ICA"."insuranceCarrierId" AS "insuranceCarrierViewId",
    "ICA"."createdAt",
    "ICA"."updatedAt"
   FROM "InsuranceCarrierAdjuster" "ICA"
UNION
 SELECT "ICAD".id,
    "ICAD".name,
    "ICAD".type,
    "ICAD".phone,
    "ICAD".email,
    "ICAD".address,
    "ICAD"."insuranceCarrierDraftId" AS "insuranceCarrierViewId",
    "ICAD"."createdAt",
    "ICAD"."updatedAt"
   FROM "InsuranceCarrierAdjusterDraft" "ICAD";


   CREATE OR REPLACE VIEW "InsuranceCarrierView" AS
 SELECT "IC".id,
    "IC".name,
    "IC".email,
    "IC".phone,
    "IC".fax,
    "A"."formattedAddress" AS address,
    NULL::text AS "insuranceCarrierId",
    "IC"."createdAt",
    "IC"."updatedAt"
   FROM "InsuranceCarrier" "IC"
     JOIN "Address" "A" ON "A".id = "IC"."addressId"
UNION
 SELECT "ICD".id,
    "ICD".name,
    "ICD".email,
    "ICD".phone,
    "ICD".fax,
    "ICD".address,
    "ICD"."insuranceCarrierId",
    "ICD"."createdAt",
    "ICD"."updatedAt"
   FROM "InsuranceCarrierDraft" "ICD";


CREATE OR REPLACE VIEW "InsuranceScopeGroupView" AS
 SELECT "ISG".id,
    "ISG".name,
    "ISG".notes,
    "ISG"."totalTax",
    "ISG"."totalRCV",
    "ISG"."totalACV",
    "ISG".depreciation,
    "ISG".overhead,
    "ISG"."parentId",
    "ISG"."insuranceScopeId" AS "insuranceScopeViewId",
    "ISG"."createdAt",
    "ISG"."updatedAt"
   FROM "InsuranceScopeGroup" "ISG"
UNION
 SELECT "ISGD".id,
    "ISGD".name,
    "ISGD".notes,
    "ISGD"."totalTax",
    "ISGD"."totalRCV",
    "ISGD"."totalACV",
    "ISGD".depreciation,
    "ISGD".overhead,
    "ISGD"."parentId",
    "ISGD"."insuranceScopeDraftId" AS "insuranceScopeViewId",
    "ISGD"."createdAt",
    "ISGD"."updatedAt"
   FROM "InsuranceScopeGroupDraft" "ISGD";

CREATE OR REPLACE VIEW "InsuranceScopeLineItemView" AS
 SELECT "ISLI".id,
    "ISLI".description,
    "ISLI"."sequence",
    "ISLI".notes,
    "ISLI".quantity,
    "ISLI"."unitOfMeasurement",
    "ISLI"."unitPrice",
    "ISLI".tax,
    "ISLI".overhead,
    "ISLI".rcv,
    "ISLI".acv,
    "ISLI"."ageLife",
    "ISLI".condition,
    "ISLI"."depreciationPercentage",
    "ISLI"."depreciationSum",
    "ISLI"."isDepreciationRefundable",
    "ISLI"."insuranceScopeGroupId" AS "insuranceScopeGroupViewId",
    "ISLI"."insuranceScopeId" AS "insuranceScopeViewId",
    "ISLI"."claimItemId",
    "ISLI"."createdAt",
    "ISLI"."updatedAt"
   FROM "InsuranceScopeLineItem" "ISLI"
UNION
 SELECT "ISLID".id,
    "ISLID".description,
    "ISLID"."sequence",
    "ISLID".notes,
    "ISLID".quantity,
    "ISLID"."unitOfMeasurement",
    "ISLID"."unitPrice",
    "ISLID".tax,
    "ISLID".overhead,
    "ISLID".rcv,
    "ISLID".acv,
    "ISLID"."ageLife",
    "ISLID".condition,
    "ISLID"."depreciationPercentage",
    "ISLID"."depreciationSum",
    "ISLID"."isDepreciationRefundable",
    "ISLID"."insuranceScopeGroupDraftId" AS "insuranceScopeGroupViewId",
    "ISLID"."insuranceScopeDraftId" AS "insuranceScopeViewId",
    "ISLID"."claimItemId",
    "ISLID"."createdAt",
    "ISLID"."updatedAt"
   FROM "InsuranceScopeLineItemDraft" "ISLID";
