import { ChangeEmailRequestStatus, PrismaClient } from '@prisma/client';

import * as changeEmailRequestsRepository from './repository';

export async function updateStatusById(
  id: string,
  status: ChangeEmailRequestStatus,
  tx?: PrismaClient
) {
  return changeEmailRequestsRepository.updateStatusById(id, status, tx);
}
