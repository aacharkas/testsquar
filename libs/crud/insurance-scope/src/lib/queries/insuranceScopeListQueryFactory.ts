import { InsuranceScopeListParams } from '../models/InsuranceScopeListParams';

export const insuranceScopeFindVersionIdQueryFactory = () => `
  SELECT
    "ISLI"."id",
    "ISLI"."dateOfLoss",
    "ISLI"."claimNumber",
    "ISLI"."totalRcv",
    "ISLI"."deductible",
    "ISLI"."status",
    "ISLI"."customerName" AS "customerName",
    "ISLI"."propertyAddress" AS "propertyAddress",
    "ISLI"."insuranceCarrierName" AS "insuranceCarrierName",
    "ISLI"."versionId"
  FROM
    "InsuranceScopeListItem" AS "ISLI"
  WHERE
    "ISLI"."companyId" = $1 AND
    levenshtein(LOWER("ISLI"."claimNumber"), LOWER($2)) <= 1 OR LOWER("ISLI"."claimNumber") LIKE '%' || LOWER($2) || '%' AND
    levenshtein(LOWER("ISLI"."insuranceCarrierName"), LOWER($3)) <= 1 OR LOWER("ISLI"."insuranceCarrierName") LIKE '%' || LOWER($3) || '%'
  ORDER BY "ISLI"."createdAt" DESC
`;

const insuranceScopeListQueryBase = (
  searchParams: InsuranceScopeListParams
) => `
  SELECT
    "ISLI"."id",
    "ISLI"."createdAt",
    "C"."name" AS "companyName",
    "ISLI"."dateOfLoss",
    "ISLI"."claimNumber",
    "ISLI"."totalRcv",
    "ISLI"."deductible",
    "ISLI"."status",
    "ISLI"."customerName" AS "customerName",
    "ISLI"."propertyAddress" AS "propertyAddress",
    "ISLI"."insuranceCarrierName" AS "insuranceCarrierName",
    "ISLI"."savedCustomerName" AS "savedCustomerName",
    "ISLI"."versionId"
  FROM
    "InsuranceScopeListItem" AS "ISLI"
  JOIN "Company" "C" ON  "C"."id" = "ISLI"."companyId"
  ${addWhere(searchParams)}
`;

function getFilterByCustomerIds(
  searchParams: InsuranceScopeListParams
): string {
  return searchParams.filter.customerIds
    ? `"ISLI"."customerId"::TEXT = ANY ($3) `
    : '';
}

function getSearchQuery(searchParams: InsuranceScopeListParams): string {
  return searchParams.search
    ? `(
          levenshtein(LOWER("ISLI"."claimNumber"), LOWER($1)) <= 1 OR LOWER("ISLI"."claimNumber") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("ISLI"."customerName"), LOWER($1)) <= 1 OR LOWER("ISLI"."customerName") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("ISLI"."propertyAddress"), LOWER($1)) <= 1 OR LOWER("ISLI"."propertyAddress") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("ISLI"."companyName"), LOWER($1)) <= 1 OR LOWER("ISLI"."companyName") LIKE '%' || LOWER($1) || '%'
        ) `
    : '';
}

function getFilterByResponsibleUserId(
  searchParams: InsuranceScopeListParams
): string {
  return searchParams.responsibleUserId
    ? `$2 = ANY("ISLI"."responsibleUserIds")`
    : '';
}

function getFilterByInsuranceCarrierIds(
  searchParams: InsuranceScopeListParams
): string {
  return searchParams.filter.insuranceCarrierIds
    ? `"ISLI"."insuranceCarrierId"::TEXT = ANY ($4) `
    : '';
}

function getFilterByDateOfLoss(searchParams: InsuranceScopeListParams): string {
  return searchParams.filter.dateOfLossFrom
    ? `"ISLI"."dateOfLoss" BETWEEN $5::TIMESTAMP AND $6::TIMESTAMP`
    : '';
}

function getFilterByRcvFrom(searchParams: InsuranceScopeListParams): string {
  return searchParams.filter.rcvFrom !== undefined
    ? '"ISLI"."totalRcv" >= $7::NUMERIC'
    : '';
}

function getFilterByRcvTo(searchParams: InsuranceScopeListParams): string {
  return searchParams.filter.rcvTo !== undefined
    ? '"ISLI"."totalRcv" <= $8::NUMERIC'
    : '';
}

function getFilterByCompanyIds(searchParams: InsuranceScopeListParams): string {
  return searchParams.filter.companyIds
    ? `"ISLI"."companyId"::TEXT = ANY ($9) `
    : '';
}

function getFilterByUploadDate(searchParams: InsuranceScopeListParams): string {
  return searchParams.filter.createdAtFrom
    ? `"ISLI"."createdAt" BETWEEN $10::TIMESTAMP AND $11::TIMESTAMP`
    : '';
}

function getFilterByStatus(searchParams: InsuranceScopeListParams): string {
  return searchParams.filter.status ? `"ISLI"."status"::TEXT = ANY($12)` : '';
}

function addWhere(searchParams: InsuranceScopeListParams): string {
  const conditions = [
    getSearchQuery(searchParams),
    getFilterByRcvFrom(searchParams),
    getFilterByRcvTo(searchParams),
    getFilterByResponsibleUserId(searchParams),
    getFilterByCustomerIds(searchParams),
    getFilterByInsuranceCarrierIds(searchParams),
    getFilterByDateOfLoss(searchParams),
    getFilterByCompanyIds(searchParams),
    getFilterByUploadDate(searchParams),
    getFilterByStatus(searchParams),
  ];
  const notEmptyConditions = conditions.filter((condition) => condition !== '');
  if (notEmptyConditions.length) {
    return `WHERE ${notEmptyConditions.join(' AND ')}`;
  }
  return '';
}

export const insuranceScopeListQueryFactory = (
  searchParams: InsuranceScopeListParams
) => `
  ${insuranceScopeListQueryBase(searchParams)}
  ORDER BY "ISLI"."createdAt" DESC
  LIMIT $13 OFFSET $14
`;

export const insuranceScopeListCountQueryFactory = (
  searchParams: InsuranceScopeListParams
) => `
  SELECT COUNT(*) ::INTEGER AS "totalCount"
  FROM (${insuranceScopeListQueryBase(searchParams)}) AS source
`;
