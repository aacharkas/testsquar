import * as bcrypt from 'bcryptjs';

import { isPasswordPwned } from '@squaredash/shared/apis/pwnedpasswords';

import {
  PasswordPwnedError,
  UserNotFoundError,
  WrongPasswordError,
} from './errors';
import { ChangePasswordPayload } from './models/change-password-payload';
import * as repository from './repository/user';

export async function changePassword(
  userId: string,
  payload: ChangePasswordPayload
): Promise<void> {
  const currentPasswordHash = await repository.getUserPassword(userId);

  if (!currentPasswordHash) {
    throw new UserNotFoundError();
  }

  const passwordsMatched = await bcrypt.compare(
    payload.oldPassword,
    currentPasswordHash
  );
  if (!passwordsMatched) {
    throw new WrongPasswordError();
  }

  const passwordPwned = await isPasswordPwned(payload.newPassword);
  if (passwordPwned) {
    throw new PasswordPwnedError();
  }

  const newPasswordHash = await hashPassword(payload.newPassword);
  await repository.update({ id: userId }, { password: newPasswordHash });
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
