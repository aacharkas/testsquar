import { Prisma, PrismaClient } from '@prisma/client';

import {
  InsuranceScopeValidationType,
  ValidationNotification,
} from '@squaredash/shared/models';

import * as repository from './lib/repository';

export async function create(
  args: Prisma.InsuranceScopeValidationRunCreateArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.create(args, tx);
}

export async function findMany(
  args: Prisma.InsuranceScopeValidationRunFindManyArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.findMany(args, tx);
}

export async function remove(
  insuranceScopeId: string,
  tx?: Prisma.TransactionClient
) {
  return repository.remove(insuranceScopeId, tx);
}

export async function update(
  where: Prisma.InsuranceScopeValidationRunWhereUniqueInput,
  data: Prisma.InsuranceScopeValidationRunUpdateInput
) {
  return repository.update(where, data);
}

export async function isErrorsInValidationNotifications(
  insuranceScopeId: string,
  tx?: PrismaClient
): Promise<boolean> {
  const lastValidationRun = await findMany(
    {
      where: {
        insuranceScopeDraftId: insuranceScopeId,
      },
    },
    tx
  );
  const notifications =
    (lastValidationRun[0]?.notifications as ValidationNotification[]) || [];
  return notifications.some(
    (notification) => notification.type === InsuranceScopeValidationType.error
  );
}
