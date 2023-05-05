import { Prisma, TokenType } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function isTokenExists(
  token: string,
  type: TokenType
): Promise<boolean> {
  const data = await prisma.token.findUnique({
    where: {
      type_token: {
        token,
        type,
      },
    },
  });
  return !!data;
}

export function deleteMany(where: Prisma.TokenWhereInput) {
  return prisma.token.deleteMany({ where });
}
