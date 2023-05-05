import { Prisma, PrismaClient } from '@prisma/client';

import { PRISMA_ERROR } from '@squaredash/shared/constants';

import { AddressAlreadyExistsError } from './lib/errors/address-already-exists-error';
import * as repository from './lib/repository';

export async function create(data: Prisma.UserCreateInput, tx?: PrismaClient) {
  try {
    return await repository.create(data, tx);
  } catch (err) {
    handleUniqueConstraintError(err);
  }
}

function handleUniqueConstraintError(error: unknown): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (
      message.includes(
        '`country`,`state`,`city`,`zipCode`,`streetAddress1`,`formattedAddress`'
      )
    ) {
      throw new AddressAlreadyExistsError();
    }
  }

  throw error;
}

export function update(
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
  tx?: PrismaClient
) {
  return repository.update(where, data, tx);
}

export async function findMany(args: Prisma.UserFindManyArgs) {
  return repository.findMany(args);
}

export async function findManyWithCount(
  args: Prisma.UserFindManyArgs,
  countArgs: Prisma.UserCountArgs
) {
  return repository.findManyWithCount(args, countArgs);
}

export async function find(args: Prisma.UserFindFirstArgs, tx?: PrismaClient) {
  return repository.find(args, tx);
}

export async function findWithPassword(
  where: Prisma.UserWhereUniqueInput,
  tx?: PrismaClient
) {
  return repository.findWithPassword(where, tx);
}

export async function findFirst(
  args: Prisma.UserFindFirstArgs,
  tx?: PrismaClient
) {
  return repository.findFirst(args, tx);
}
