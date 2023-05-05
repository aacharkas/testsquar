import { COMPANY_STATUS, UPLOAD_TYPE } from '@squaredash/shared/constants';
import { getFileLink } from '@squaredash/shared/util';

import { Company, CompanyListRow } from '../interfaces';
import { CompanyModel } from '../types';

export function companyEntityToCompany(
  company: CompanyModel,
  count: number
): Company {
  return {
    id: company.id,
    name: company.name,
    owners: {
      rows: company.users.map((user) => ({
        id: user.id,
        name: user.name,
      })),
      totalCount: count,
    },
  };
}

export function companyEntityToCompanyListRow(
  company: CompanyModel,
  count: number
): CompanyListRow {
  return {
    id: company.id,
    name: company.name,
    status: company.status as COMPANY_STATUS,
    owners: {
      rows: company.users.map((user) => ({
        id: user.id,
        name: user.name,
      })),
      totalCount: count,
    },
    avatar: getFileLink(company.avatarId, UPLOAD_TYPE.COMPANY_AVATAR),
  };
}
