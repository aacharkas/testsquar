import { Prisma, Token, TokenType } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(data: Prisma.TokenCreateInput): Promise<Token> {
  return prisma.token.create({
    data,
  });
}

export async function removeMany(where: Prisma.TokenWhereInput) {
  return prisma.token.deleteMany({
    where,
  });
}

export async function merge(
  data: Omit<Token, 'id' | 'createdAt' | 'updatedAt'>
) {
  const token = await prisma.token.findFirst({
    where: {
      userId: data.userId,
      type: data.type,
    },
  });
  if (!token) {
    return prisma.token.create({
      data,
    });
  }

  return prisma.token.update({
    where: {
      id: token.id,
    },
    data: {
      token: data.token,
    },
  });
}

export async function removeByUserId(
  userId: string,
  currentToken: string,
  type: TokenType
): Promise<void> {
  await prisma.token.deleteMany({
    where: {
      userId,
      type,
      token: {
        notIn: [currentToken],
      },
    },
  });
}
