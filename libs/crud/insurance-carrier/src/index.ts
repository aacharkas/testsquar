import { InsuranceCarrier, Prisma } from '@prisma/client';

import { List } from '@squaredash/shared/interfaces';

import { handleUniqueConstraintError as handleUniqueConstraint } from './lib/helpers/handle-unique-constraint-error';
import { InsuranceCarrierModelWithMeta } from './lib/models/insurance-carrier-model-with-meta';
import * as repository from './lib/repository';

export async function getById(
  id: string
): Promise<InsuranceCarrierModelWithMeta | null> {
  return repository.getById(id);
}

export function create(
  data: Prisma.InsuranceCarrierCreateInput
): Promise<InsuranceCarrier> {
  return repository.create(data);
}

export function update(
  where: Prisma.InsuranceCarrierWhereUniqueInput,
  data: Prisma.InsuranceCarrierUpdateInput
): Promise<InsuranceCarrier> {
  return repository.update(where, data);
}

export async function findMany(
  args: Prisma.InsuranceCarrierFindManyArgs
): Promise<List<InsuranceCarrier>> {
  return repository.findMany(args);
}

export async function find(
  where: Prisma.InsuranceCarrierWhereUniqueInput,
  include?: Prisma.InsuranceCarrierInclude
): Promise<InsuranceCarrier | null> {
  return repository.find(where, include);
}

export function handleUniqueConstraintError(err: any): never {
  handleUniqueConstraint(err);
}

export async function findFirst(
  where: Prisma.InsuranceCarrierWhereInput,
  include?: Prisma.InsuranceCarrierInclude
) {
  return repository.findFirst(where, include);
}

// TODO: how to export errors properly?
export * from './lib/errors/insurance-carrier-not-found';
