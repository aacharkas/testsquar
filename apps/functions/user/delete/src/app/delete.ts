import * as bcrypt from 'bcryptjs';

import * as tokenCrud from '@squaredash/crud/token';
import * as userCrud from '@squaredash/crud/user';
import { TECH_STATUS, USER_ROLE } from '@squaredash/shared/constants';
import { NotFoundException } from '@squaredash/shared/util';

export async function deleteById(userId: string): Promise<void> {
  const user = await userCrud.find({ where: { id: userId } });
  if (!user || user.role !== USER_ROLE.SUPER_ADMIN) {
    throw new NotFoundException('IM0053');
  }

  const hashedEmail = await hashEmail(user.email);
  await Promise.all([
    userCrud.update(
      { id: user.id },
      { techStatus: TECH_STATUS.DELETED, email: hashedEmail }
    ),
    tokenCrud.deleteMany({ userId: user.id }),
  ]);
}

async function hashEmail(email: string): Promise<string> {
  return bcrypt.hash(email, 10);
}
