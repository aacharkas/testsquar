import { Prisma } from '@prisma/client';

import * as userRepository from './repository/user';

export async function create(data: Prisma.UserCreateInput) {
  return userRepository.create(data);
}
