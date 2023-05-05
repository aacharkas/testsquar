import { Prisma, PrismaClient, User as UserEntity } from '@prisma/client';

import { TECH_STATUS } from '@squaredash/shared/constants';
import {
  User,
  UserSearchOptions,
  UserWithPassword,
} from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { List, Nullable } from '@squaredash/shared/interfaces';
import { exclude } from '@squaredash/shared/util';

import { mapUserEntityWithAddressToUserWithAddress } from '../mappers/user-entity-with-address-to-user-with-address';
import { UserEntityWithAddress } from '../models/user-entity-with-address';
import { UserWithAddress } from '../models/user-with-address';

export async function findByIds(ids: string[], tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function getById(id: string): Promise<Nullable<User>> {
  const userEntity: UserEntity | null = await prisma.user.findFirst({
    where: {
      id,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
  });

  return userEntity ? exclude(userEntity, ['password']) : null;
}

export async function getByIdWithAddress(id: string) {
  const userEntity = await prisma.user.findFirst({
    where: {
      id,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include: {
      Address: true,
    },
  });

  return userEntity
    ? mapUserEntityWithAddressToUserWithAddress(userEntity)
    : null;
}

export async function getUserPassword(
  userId: string
): Promise<Nullable<string>> {
  const response = await prisma.user.findFirst({
    select: {
      password: true,
    },
    where: {
      id: userId,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
  });

  return response?.password;
}

export async function getByEmail(
  email: string
): Promise<Nullable<Omit<UserEntity, 'password'>>> {
  const userEntity: Nullable<UserEntity> = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return userEntity ? exclude(userEntity, ['password']) : null;
}

export async function getWithPasswordByEmail(
  email: string
): Promise<UserWithPassword | null> {
  const user: UserEntity | null = await prisma.user.findFirst({
    where: {
      email,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
  });

  return user ? user : null;
}

export async function create(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  });
}

export async function update(
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
) {
  return prisma.user.update({
    where,
    data,
  });
}

export async function find(where: Prisma.UserWhereInput, tx?: PrismaClient) {
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

export async function list(
  options: UserSearchOptions
): Promise<List<UserWithAddress>> {
  const whereInput: Prisma.UserWhereInput = {
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
    companyId: options.companyId,
  };

  if (options.search) {
    whereInput.OR = [
      {
        name: {
          contains: options.search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: options.search,
          mode: 'insensitive',
        },
      },
      {
        phone: {
          contains: options.search.replaceAll(/[()\- ]/g, ''),
        },
      },
    ];
  }

  if (options.statuses) {
    whereInput.status = {
      in: options.statuses,
    };
  }

  if (options.roles) {
    whereInput.role = {
      in: options.roles,
    };
  }

  const [rows, totalCount]: [UserEntityWithAddress[], number] =
    await Promise.all([
      prisma.user.findMany({
        where: whereInput,
        orderBy: {
          [options.sortCol]: options.sortOrder,
        },
        skip: options.skip,
        take: options.take,
        include: {
          Address: true,
        },
      }),
      prisma.user.count({
        where: whereInput,
      }),
    ]);

  return {
    rows: rows.map(mapUserEntityWithAddressToUserWithAddress),
    totalCount,
  };
}
