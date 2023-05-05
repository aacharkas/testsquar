import {
  CompanyWithMeta,
  CompanyWithMetaOwnerResponse,
} from '@squaredash/company';

export function companyWithMetaToOwnerResponse(
  company: CompanyWithMeta
): CompanyWithMetaOwnerResponse {
  return {
    id: company.id,
    legalName: company.legalName,
    name: company.name,
    locations: company.locations,
    owners: company.owners,
    avatar: company.avatar,
  };
}
