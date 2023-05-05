import { JobListParams } from '../models/JobListParams';

const getSearchQuery = (searchParams: JobListParams) =>
  searchParams.search
    ? `AND (
          levenshtein(LOWER("JLI"."claimNumber"), LOWER($1)) <= 1 OR LOWER("JLI"."claimNumber") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("JLI"."customerName"), LOWER($1)) <= 1 OR LOWER("JLI"."customerName") LIKE '%' || LOWER($1) || '%'
          OR levenshtein(LOWER("JLI"."propertyAddress"), LOWER($1)) <= 1 OR LOWER("JLI"."propertyAddress") LIKE '%' || LOWER($1) || '%'
        )`
    : '';

const getFilterByResponsibleUserId = (searchParams: JobListParams) =>
  searchParams.responsibleUserId
    ? `AND $2 = ANY("JLI"."responsibleUserIds")`
    : '';

const getFilterByCompanyIds = (searchParams: JobListParams) =>
  searchParams.filter.companyIds ? `AND "JLI"."companyId"::TEXT = ANY($3)` : '';

const getFilterByCustomerIds = (searchParams: JobListParams) =>
  searchParams.filter.customerIds
    ? `AND "JLI"."customerId"::TEXT = ANY ($4) `
    : '';

const getFilterByInsuranceCarrierIds = (searchParams: JobListParams) =>
  searchParams.filter.insuranceCarrierIds
    ? `AND "JLI"."insuranceCarrierId"::TEXT = ANY ($5) `
    : '';

const getFilterByStatuses = (searchParams: JobListParams) =>
  searchParams.filter.statuses ? `AND "JLI"."status"::TEXT = ANY ($6)` : '';

const getFilterByDateOfLoss = (searchParams: JobListParams): string =>
  searchParams.filter.dateOfLossFrom
    ? `AND "JLI"."dateOfLoss" BETWEEN $7::TIMESTAMP AND $8::TIMESTAMP`
    : '';

const getFilterByDateCreated = (searchParams: JobListParams): string =>
  searchParams.filter.createdFrom
    ? `AND "JLI"."createdAt" BETWEEN $9::TIMESTAMP AND $10::TIMESTAMP`
    : '';

const getFilterByLoanFrom = (searchParams: JobListParams) =>
  searchParams.filter.loanFrom !== undefined
    ? 'AND "JLI"."loanBalance" >= $11::NUMERIC'
    : '';

const getFilterByLoanTo = (searchParams: JobListParams) =>
  searchParams.filter.loanTo !== undefined
    ? 'AND "JLI"."loanBalance" <= $12::NUMERIC'
    : '';

const getFilterByLoan = (searchParams: JobListParams) => `
  ${getFilterByLoanFrom(searchParams)}
  ${getFilterByLoanTo(searchParams)}
`;

const getFilterByDueBalanceFrom = (searchParams: JobListParams) =>
  searchParams.filter.dueBalanceFrom !== undefined
    ? 'AND "JLI"."dueBalance" >= 13::NUMERIC'
    : '';

const getFilterByDueBalanceTo = (searchParams: JobListParams) =>
  searchParams.filter.dueBalanceTo !== undefined
    ? 'AND "JLI"."dueBalance" <= $14::NUMERIC'
    : '';

const getFilterByDueBalance = (searchParams: JobListParams) => `
  ${getFilterByDueBalanceFrom(searchParams)}
  ${getFilterByDueBalanceTo(searchParams)}
`;

export const jobListQueryFactory = (searchParams: JobListParams) => `
  ${jobListQueryBase(searchParams)}
  ORDER BY "JLI"."createdAt" DESC
  LIMIT $15 OFFSET $16
`;

export const jobListCountQueryFactory = (searchParams: JobListParams) => `
  SELECT COUNT(*)::INTEGER AS "totalCount"
  FROM (${jobListQueryBase(searchParams)}) AS source
`;

const jobListQueryBase = (searchParams: JobListParams) => `
  SELECT
    "id",
    "customerName",
    "propertyAddress",
    "insuranceCarrierName",
    "claimNumber",
    "dateOfLoss",
    "dueBalance",
    "loanBalance",
    "sumPaid",
    "availableAdvance",
    "deductible",
    "status",
    "createdAt"
  FROM "JobListItem" AS "JLI"
  WHERE
    "JLI".id IS NOT NULL
    ${getSearchQuery(searchParams)}
    ${getFilterByResponsibleUserId(searchParams)}
    ${getFilterByCompanyIds(searchParams)}
    ${getFilterByCustomerIds(searchParams)}
    ${getFilterByInsuranceCarrierIds(searchParams)}
    ${getFilterByStatuses(searchParams)}
    ${getFilterByDateOfLoss(searchParams)}
    ${getFilterByDateCreated(searchParams)}
    ${getFilterByLoan(searchParams)}
    ${getFilterByDueBalance(searchParams)}
`;
