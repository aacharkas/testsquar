import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(
  data: Prisma.InvitationCreateInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;
  return executor.invitation.create({
    data,
  });
}

export async function find(
  where: Prisma.InvitationWhereUniqueInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;
  return executor.invitation.findUnique({
    where,
  });
}

export async function remove(
  where: Prisma.InvitationWhereUniqueInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;
  return executor.invitation.delete({
    where,
  });
}
