import { Prisma } from '@prisma/client';

import * as invitationRepository from './repository/invitation';

export async function create(data: Prisma.InvitationCreateInput) {
  return invitationRepository.create(data);
}
