import {
  COME_FROM,
  COMPANY_STATUS,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
  TECH_STATUS,
  UPLOAD_TYPE,
  USER_ROLE,
  numberOfOwnersDisplayed,
} from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { getFileLink } from '@squaredash/shared/util';

import { CompanyWithMeta } from '../interfaces/company-with-meta';
import { CompanyWithMetaModel } from '../types/CompanyWithMetaModel';

export async function getByIdWithMeta(
  id: string
): Promise<CompanyWithMeta | null> {
  const [companyWithMeta, ownerCount]: [CompanyWithMetaModel, number] =
    await Promise.all([
      prisma.company.findFirst({
        where: {
          id,
          techStatus: {
            not: TECH_STATUS.DELETED,
          },
        },
        include: {
          locations: {
            where: {
              techStatus: TECH_STATUS.ACTIVE,
            },
            orderBy: [{ isMain: 'desc' }, { name: 'asc' }],
            include: {
              address: true,
            },
          },
          users: {
            where: {
              role: USER_ROLE.COMPANY_OWNER,
              techStatus: TECH_STATUS.ACTIVE,
            },
            take: numberOfOwnersDisplayed,
          },
        },
      }),
      prisma.user.count({
        where: {
          companyId: id,
          role: USER_ROLE.COMPANY_OWNER,
          techStatus: TECH_STATUS.ACTIVE,
        },
      }),
    ]);

  return companyWithMeta
    ? companyEntityToCompanyWithMeta(companyWithMeta, ownerCount)
    : null;
}

function companyEntityToCompanyWithMeta(
  company: CompanyWithMetaModel,
  count: number
): CompanyWithMeta {
  return {
    id: company.id,
    name: company.name,
    legalName: company.legalName || company.name,
    numberOfEmployees: company.numberOfEmployees as NUMBER_OF_EMPLOYEES,
    numberOfInsuranceJobsPerMonth:
      company.numberOfInsuranceJobsPerMonth as NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
    comeFrom: company.comeFrom as COME_FROM,
    status: company.status as COMPANY_STATUS,
    locations: company.locations,
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
