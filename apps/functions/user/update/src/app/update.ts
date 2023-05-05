import { Prisma, User } from '@prisma/client';

import * as tokenCrud from '@squaredash/crud/token';
import * as userCrud from '@squaredash/crud/user';
import * as userChangeLogCrud from '@squaredash/crud/user-change-log';
import { getRolePermissionsByRole } from '@squaredash/role';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  ForbiddenException,
  NotFoundException,
  addressCreateOrConnect,
  getChanges,
} from '@squaredash/shared/util';

import { UpdateUserPayload } from './models/update-user-payload';

export async function update(
  userId: string,
  payload: UpdateUserPayload,
  context: CustomContext
) {
  if (!Object.values(payload).length) {
    return;
  }

  const user = await userCrud.find({
    where: { id: userId },
    include: { Address: true },
  });
  if (!user) {
    throw new NotFoundException('IM0053');
  }

  // COMPANY_USER can only update itself
  if (
    context.user.id !== user.id &&
    ![
      USER_ROLE.COMPANY_OWNER,
      USER_ROLE.COMPANY_ADMIN,
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.INITIAL_ADMIN,
    ].includes(context.user.role)
  ) {
    throw new ForbiddenException('IM0054');
  }

  // SUPER_ADMIN and INITIAL_ADMIN can update people from other companies
  if (
    ![USER_ROLE.SUPER_ADMIN, USER_ROLE.INITIAL_ADMIN].includes(
      context.user.role
    ) &&
    context.user.companyId !== user.companyId
  ) {
    throw new ForbiddenException('IM0054');
  }

  // User can't update role of itself
  if (
    payload.role &&
    context.user.id === userId &&
    payload.role !== context.user.role
  ) {
    throw new ForbiddenException('IM0054');
  }

  // Check if user has required permissions to set specific role
  const userPermissions = getRolePermissionsByRole(context.user.role);
  if (
    payload.role &&
    userId !== context.user.id &&
    payload.role !== user.role &&
    !userPermissions[`user_role_${payload.role.toLowerCase()}_set`]
  ) {
    throw new ForbiddenException('IM0054');
  }

  const { address, ...data } = payload;
  const updatePayload: Prisma.UserUpdateInput = data;

  if (address !== undefined) {
    updatePayload.Address =
      address === null ? { disconnect: true } : addressCreateOrConnect(address);
  }

  const updatedUser = await userCrud.update({ id: userId }, updatePayload);
  if (payload.role && payload.role !== user.role) {
    await tokenCrud.deleteMany({ userId: userId });
  }

  await createChangeLogItem(user, payload, context);

  return { ...updatedUser, address: address || user.Address };
}

async function createChangeLogItem(
  user: Omit<User, 'password'>,
  payload: UpdateUserPayload,
  context: CustomContext
) {
  const addressChanges = payload.address ? { Address: payload.address } : {};
  const changes = getChanges(user, { ...payload, ...addressChanges });
  if (!Object.values(changes).length) {
    return;
  }

  await userChangeLogCrud.create({
    content: changes,
    createdBy: context.user.id,
    user: {
      connect: {
        id: user.id,
      },
    },
  });
}
