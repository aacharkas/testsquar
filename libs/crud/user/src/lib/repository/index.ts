import { Prisma, PrismaClient, User } from '@prisma/client';

import { TECH_STATUS } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { exclude } from '@squaredash/shared/util';

export async function update(
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
  tx?: PrismaClient
): Promise<Omit<User, 'password'> | null> {
  const executor = tx ?? prisma;

  const user = await executor.user.update({ where, data });

  return user ? exclude(user, ['password']) : null;
}

export async function create(
  data: Prisma.UserCreateInput,
  tx?: PrismaClient
): Promise<Omit<User, 'password'>> {
  const executor = tx ?? prisma;

  const user = await executor.user.create({ data });

  return exclude(user, ['password']);
}

export async function find(args: Prisma.UserFindFirstArgs, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  const user = await executor.user.findFirst({
    ...args,
    where: {
      ...args.where,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include: args.include,
  });

  return user ? exclude(user, ['password']) : null;
}

export async function findWithPassword(
  where: Prisma.UserWhereUniqueInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.user.findFirst({
    where: {
      ...where,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
  });
}

export async function findMany(args: Prisma.UserFindManyArgs) {
  args.where = {
    ...args.where,
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
  };

  return prisma.user.findMany(args);
}

export async function findManyWithCount(
  args: Prisma.UserFindManyArgs,
  countArgs: Prisma.UserCountArgs
) {
  args.where = {
    ...args.where,
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
  };
  countArgs.where = {
    ...countArgs.where,
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
  };

  return prisma.$transaction([
    prisma.user.findMany(args),
    prisma.user.count(countArgs),
  ]);
}

export async function findFirst(
  args: Prisma.UserFindFirstArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.user.findFirst(args);
}
