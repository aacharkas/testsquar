import { Prisma } from '@prisma/client';

import * as insuranceCarrierCrud from '@squaredash/crud/insurance-carrier';

import { ListInsuranceCarrierPayload } from './models/list-insurance-carrier-payload';

export async function list(options: ListInsuranceCarrierPayload) {
  const args: Prisma.InsuranceCarrierFindManyArgs = {
    where: {
      name: {
        contains: options.search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      [options.sortCol]: options.sortOrder,
    },
    skip: options.skip,
    take: options.take,
  };

  return insuranceCarrierCrud.findMany(args);
}
