import { Prisma } from '@prisma/client';

import * as userRepository from './repository/user';

export async function find(where: Prisma.UserWhereUniqueInput) {
  return userRepository.find(where);
}
