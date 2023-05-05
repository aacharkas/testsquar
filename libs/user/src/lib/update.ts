import { Prisma } from '@prisma/client';

import * as userRepository from './repository/user';

export async function update(
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
) {
  return userRepository.update(where, data);
}
