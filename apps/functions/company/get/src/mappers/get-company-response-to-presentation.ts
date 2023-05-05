import {
  CompanyWithMeta,
  CompanyWithMetaAdminResponse,
  CompanyWithMetaOwnerResponse,
} from '@squaredash/company';
import { USER_ROLE } from '@squaredash/shared/constants';

import { companyWithMetaToAdminResponse } from './company-with-meta-to-admin-response';
import { companyWithMetaToOwnerResponse } from './company-with-meta-to-owner-response';

export function getCompanyResponseToPresentation(
  role: USER_ROLE,
  company: CompanyWithMeta
): CompanyWithMetaOwnerResponse | CompanyWithMetaAdminResponse {
  if (role === USER_ROLE.COMPANY_OWNER) {
    return companyWithMetaToOwnerResponse(company);
  }
  return companyWithMetaToAdminResponse(company);
}
