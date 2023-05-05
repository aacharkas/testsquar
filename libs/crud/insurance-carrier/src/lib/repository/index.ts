import { InsuranceCarrier, Prisma } from '@prisma/client';

import { TECH_STATUS } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { List } from '@squaredash/shared/interfaces';

import { InsuranceCarrierModelWithMeta } from '../models/insurance-carrier-model-with-meta';

export async function update(
  where: Prisma.InsuranceCarrierWhereUniqueInput,
  data: Prisma.InsuranceCarrierUpdateInput
): Promise<InsuranceCarrier> {
  return prisma.insuranceCarrier.update({
    where,
    data,
  });
}

export async function create(
  data: Prisma.InsuranceCarrierCreateInput
): Promise<InsuranceCarrier> {
  return prisma.insuranceCarrier.create({ data });
}

export async function getById(
  id: string
): Promise<InsuranceCarrierModelWithMeta> {
  return prisma.insuranceCarrier.findFirst({
    where: {
      id,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include: {
      address: true,
    },
  });
}

export async function find(
  where: Prisma.InsuranceCarrierWhereUniqueInput,
  include?: Prisma.InsuranceCarrierInclude
) {
  const insuranceCarrier = await prisma.insuranceCarrier.findFirst({
    where: {
      ...where,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include,
  });

  return insuranceCarrier ? insuranceCarrier : null;
}

export async function findMany(
  args: Prisma.InsuranceCarrierFindManyArgs
): Promise<List<InsuranceCarrier>> {
  args.where = {
    ...args.where,
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
  };

  const [rows, totalCount] = await prisma.$transaction([
    prisma.insuranceCarrier.findMany(args),
    prisma.insuranceCarrier.count({ where: args.where }),
  ]);

  return {
    rows,
    totalCount,
  };
}

export async function findFirst(
  where: Prisma.InsuranceCarrierWhereInput,
  include?: Prisma.InsuranceCarrierInclude
) {
  return prisma.insuranceCarrier.findFirst({ where, include });
}
