import { Prisma } from '@prisma/client';

import * as invitationRepository from './repository/invitation';

export async function find(where: Prisma.InvitationWhereUniqueInput) {
  return invitationRepository.find(where);
}
