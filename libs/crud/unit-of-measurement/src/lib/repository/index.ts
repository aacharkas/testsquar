import {
  Prisma,
  PrismaClient,
  UnitOfMeasurement as UnitOfMeasurementModel,
} from '@prisma/client';

import { TECH_STATUS } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { List, Nullable } from '@squaredash/shared/interfaces';

import { unitOfMeasurementModelToUnitOfMeasurement } from '../mappers/unit-of-measurement-model-to-unit-of-measurement';
import { UnitOfMeasurement } from '../models/unit-of-measurement';

export async function find(
  where: Prisma.UnitOfMeasurementWhereUniqueInput
): Promise<Nullable<UnitOfMeasurement>> {
  const unitOfMeasurementModel: UnitOfMeasurementModel | null =
    await prisma.unitOfMeasurement.findFirst({ where });

  return unitOfMeasurementModel
    ? unitOfMeasurementModelToUnitOfMeasurement(unitOfMeasurementModel)
    : null;
}

export async function findMany(
  args: Prisma.UnitOfMeasurementFindManyArgs
): Promise<List<UnitOfMeasurement>> {
  args.where = {
    ...args.where,
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
  };

  const [rows, totalCount] = await prisma.$transaction([
    prisma.unitOfMeasurement.findMany(args),
    prisma.unitOfMeasurement.count({ where: args.where }),
  ]);

  return {
    rows: rows.map(unitOfMeasurementModelToUnitOfMeasurement),
    totalCount,
  };
}

export async function create(
  data: Prisma.UnitOfMeasurementCreateInput
): Promise<UnitOfMeasurement> {
  const unitOfMeasurementModel: UnitOfMeasurementModel =
    await prisma.unitOfMeasurement.create({ data });

  return unitOfMeasurementModelToUnitOfMeasurement(unitOfMeasurementModel);
}

export async function update(
  where: Prisma.UnitOfMeasurementWhereUniqueInput,
  data: Prisma.UnitOfMeasurementUpdateInput
): Promise<UnitOfMeasurement> {
  const unitOfMeasurementModel: UnitOfMeasurementModel =
    await prisma.unitOfMeasurement.update({ where, data });

  return unitOfMeasurementModelToUnitOfMeasurement(unitOfMeasurementModel);
}

export async function deleteUnitOfMeasurement(id: string): Promise<void> {
  await prisma.unitOfMeasurement.update({
    where: { id },
    data: {
      techStatus: TECH_STATUS.DELETED,
    },
  });
}

export async function upsert(
  args: Prisma.UnitOfMeasurementUpsertArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.unitOfMeasurement.upsert(args);
}
