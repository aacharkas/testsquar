import { Prisma } from '@prisma/client';

import { PRISMA_ERROR } from '@squaredash/shared/constants';
import { BadRequestException } from '@squaredash/shared/util';

export function handleUniqueConstraintError(error: any): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (message.includes('name')) {
      throw new BadRequestException('IM0038');
    }
  }

  throw error;
}
