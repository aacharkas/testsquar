import { Prisma, User } from '@prisma/client';

import * as userCrud from '@squaredash/crud/user';
import { UPLOAD_TYPE, USER_ROLE } from '@squaredash/shared/constants';
import { List } from '@squaredash/shared/interfaces';
import { getFileLink } from '@squaredash/shared/util';

import { SuperAdminListQuery } from '../models/super-admin-list-query';

export type SuperAdminResponseItem = Pick<User, 'name' | 'email'> & {
  avatar: string;
};

export async function list(
  query: SuperAdminListQuery
): Promise<List<SuperAdminResponseItem>> {
  const findArgs: Prisma.UserFindManyArgs = {
    select: {
      id: true,
      name: true,
      email: true,
      avatarId: true,
      status: true,
    },
    where: {
      role: USER_ROLE.SUPER_ADMIN,
    },
    orderBy: {
      [query.sortCol]: query.sortOrder,
    },
    skip: query.skip,
    take: query.take,
  };

  if (query.search) {
    findArgs.where.name = { contains: query.search, mode: 'insensitive' };
  }

  const [rows, totalCount] = await userCrud.findManyWithCount(findArgs, {
    where: {
      role: USER_ROLE.SUPER_ADMIN,
    },
  });

  return {
    rows: rows.map((row) => ({
      ...row,
      avatar: getFileLink(row.avatarId, UPLOAD_TYPE.USER_AVATAR),
    })),
    totalCount,
  };
}
