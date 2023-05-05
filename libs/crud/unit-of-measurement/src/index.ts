import { Prisma, PrismaClient } from '@prisma/client';

import { List, Nullable } from '@squaredash/shared/interfaces';

import { UnitOfMeasurementNotFoundError } from './lib/errors';
import { handleUniqueConstraintError } from './lib/helpers';
import { UnitOfMeasurement } from './lib/models/unit-of-measurement';
import * as repository from './lib/repository';

export async function find(
  where: Prisma.UnitOfMeasurementWhereUniqueInput
): Promise<UnitOfMeasurement> {
  const existedUnitOfMeasurement: Nullable<UnitOfMeasurement> =
    await repository.find(where);

  if (!existedUnitOfMeasurement) {
    throw new UnitOfMeasurementNotFoundError();
  }

  return existedUnitOfMeasurement;
}

export async function findMany(
  args: Prisma.UnitOfMeasurementFindManyArgs
): Promise<List<UnitOfMeasurement>> {
  return repository.findMany(args);
}

export async function create(
  data: Prisma.UnitOfMeasurementCreateInput
): Promise<UnitOfMeasurement> {
  try {
    return await repository.create(data);
  } catch (e) {
    handleUniqueConstraintError(e);
  }
}

export async function update(
  where: Prisma.UnitOfMeasurementWhereUniqueInput,
  data: Prisma.UnitOfMeasurementUpdateInput
): Promise<UnitOfMeasurement> {
  await find(where);

  try {
    return await repository.update(where, data);
  } catch (e) {
    handleUniqueConstraintError(e);
  }
}

export async function deleteUnitOfMeasurement(id: string): Promise<void> {
  const existedUnitOfMeasurement: Nullable<UnitOfMeasurement> =
    await repository.find({ id });

  if (!existedUnitOfMeasurement) {
    return;
  }

  await repository.deleteUnitOfMeasurement(id);
}

export async function upsert(
  args: Prisma.UnitOfMeasurementUpsertArgs,
  tx?: PrismaClient
) {
  return repository.upsert(args, tx);
}
