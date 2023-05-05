import * as tokenCrud from '@squaredash/crud/token';
import * as userCrud from '@squaredash/crud/user';
import { USER_STATUS } from '@squaredash/shared/constants';
import { BadRequestException } from '@squaredash/shared/util';

export async function updateStatus(
  userId: string,
  currentUserId: string,
  companyId?: string
): Promise<void> {
  if (userId === currentUserId) {
    throw new BadRequestException('IM0053');
  }

  const user = await userCrud.find({ where: { id: userId } });
  if (!user || (companyId && companyId !== user.companyId)) {
    throw new BadRequestException('IM0053');
  }

  if (user.status === USER_STATUS.ACTIVE) {
    await suspend(userId);
  } else if (user.status === USER_STATUS.SUSPENDED) {
    await userCrud.update({ id: userId }, { status: USER_STATUS.ACTIVE });
  } else {
    throw new BadRequestException('IM0055');
  }
}

async function suspend(userId: string): Promise<void> {
  await userCrud.update({ id: userId }, { status: USER_STATUS.SUSPENDED });
  await tokenCrud.deleteMany({ userId: userId });
}
