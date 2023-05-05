import { Prisma } from '@prisma/client';

import { PRISMA_ERROR } from '@squaredash/shared/constants';

import { AddressAlreadyExistsError, CompanyNotFoundError } from './errors';

export function handleUniqueConstraintLocationError(error: any): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (message.includes('addressId')) {
      throw new AddressAlreadyExistsError();
    }
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.REQUIRED_FIELDS_NOT_FOUND
  ) {
    const message = error.message;

    if (message.includes('CompanyToCompanyLocation')) {
      throw new CompanyNotFoundError();
    }
  }

  throw error;
}
