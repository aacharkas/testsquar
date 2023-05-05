import { SignInLog } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { SIGN_IN_STATUS } from '../constants/sign-in-status';

export async function logSignInAttempt(
  email: string,
  status?: SIGN_IN_STATUS
): Promise<void> {
  await prisma.signInLog.create({
    data: {
      user: { connect: { email } },
      status,
    },
  });
}

export async function getSignInLogsInWindow(
  userId: string,
  observationWindowEnd: Date,
  lockoutThreshold: number
): Promise<SignInLog[]> {
  return prisma.signInLog.findMany({
    where: {
      userId,
      createdAt: {
        gte: observationWindowEnd,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: lockoutThreshold,
  });
}

export async function lockAccount(userId: string): Promise<void> {
  const createLockedLog = prisma.accountLockedLog.create({
    data: {
      user: { connect: { id: userId } },
    },
  });

  const updateUserLockedAt = prisma.user.update({
    where: { id: userId },
    data: {
      lockedAt: new Date(),
    },
  });

  await prisma.$transaction([createLockedLog, updateUserLockedAt]);
}
