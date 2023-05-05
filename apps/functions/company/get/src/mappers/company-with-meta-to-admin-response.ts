import {
  CompanyWithMeta,
  CompanyWithMetaAdminResponse,
} from '@squaredash/company';

export function companyWithMetaToAdminResponse(
  company: CompanyWithMeta
): CompanyWithMetaAdminResponse {
  return {
    id: company.id,
    name: company.name,
    legalName: company.legalName,
    status: company.status,
    numberOfEmployees: company.numberOfEmployees,
    numberOfInsuranceJobsPerMonth: company.numberOfInsuranceJobsPerMonth,
    comeFrom: company.comeFrom,
    locations: company.locations,
    owners: company.owners,
    avatar: company.avatar,
  };
}
