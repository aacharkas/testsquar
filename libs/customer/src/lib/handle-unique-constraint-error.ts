import { Prisma } from '@prisma/client';

import { PRISMA_ERROR } from '@squaredash/shared/constants';

import {
  CustomerNotFoundError,
  CustomerWithDisplayNameAlreadyExistsError,
  CustomerWithPhoneAlreadyExistsError,
  EmailAlreadyInUseError,
} from './errors';

export function handleUniqueConstraintError(error: any): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (message.includes('email')) {
      throw new EmailAlreadyInUseError();
    } else if (message.includes('phone')) {
      throw new CustomerWithPhoneAlreadyExistsError();
    } else if (message.includes('displayName')) {
      throw new CustomerWithDisplayNameAlreadyExistsError();
    }
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.REQUIRED_FIELDS_NOT_FOUND
  ) {
    const message = error.message;

    if (message.includes('CompanyToCustomer')) {
      throw new CustomerNotFoundError();
    }
  }

  throw error;
}
