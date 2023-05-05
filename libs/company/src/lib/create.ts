import { CompanyStatus, Prisma } from '@prisma/client';

import { handleUniqueConstraintError } from './handle-unique-constraint-error';
import { Company } from './interfaces';
import * as companyRepository from './repository/company';

export async function create(
  userId: string,
  payload: Prisma.CompanyCreateInput
): Promise<Company> {
  try {
    return await companyRepository.create({
      data: {
        ...payload,
        status: CompanyStatus.ACTIVE,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    handleUniqueConstraintError(error);
  }
}
