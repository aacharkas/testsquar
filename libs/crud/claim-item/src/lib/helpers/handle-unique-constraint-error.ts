import { Prisma } from '@prisma/client';

import { PRISMA_ERROR } from '@squaredash/shared/constants';

import { ClaimItemAlreadyExists } from '../errors/claim-item-already-exists.error';

export function handleUniqueConstraintError(error: any): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (message.includes('description')) {
      throw new ClaimItemAlreadyExists();
    }
  }

  throw error;
}
