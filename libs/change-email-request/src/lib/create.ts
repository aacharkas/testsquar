import { PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { CreateChangeEmailRequest } from './models/create-change-email-request';
import * as changeEmailRequestsRepository from './repository';

export async function create(payload: CreateChangeEmailRequest) {
  return prisma.$transaction(async (tx) => {
    const transaction = tx as PrismaClient;

    await changeEmailRequestsRepository.cancelRequestsByUserId(
      payload.userId,
      transaction
    );

    const validUntil = new Date(Date.now() + 1000 * 60 * 60 * 24);

    return changeEmailRequestsRepository.create(
      {
        user: {
          connect: {
            id: payload.userId,
          },
        },
        createdBy: {
          connect: {
            id: payload.createdById,
          },
        },
        newEmail: payload.newEmail,
        validUntil,
      },
      transaction
    );
  });
}
