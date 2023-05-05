import { Prisma } from '@prisma/client';

import { PRISMA_ERROR } from '@squaredash/shared/constants';

import { UnitOfMeasurementUniqueNameError } from '../errors';

export function handleUniqueConstraintError(error: any): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (message.includes('name')) {
      throw new UnitOfMeasurementUniqueNameError();
    }
  }

  throw error;
}
