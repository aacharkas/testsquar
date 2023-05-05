import { TokenType, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

import * as tokenRepository from '@squaredash/crud/token';
import * as userRepository from '@squaredash/crud/user';
import * as messageQueueService from '@squaredash/message-queue';
import { isPasswordPwned } from '@squaredash/shared/apis/pwnedpasswords';
import { Config, TemplateIds, validateToken } from '@squaredash/shared/util';

import { PasswordPwnedError } from './errors';
import { InvalidResetPasswordTokenError } from './errors/invalid-reset-password-token';

const config = Config.JWT;

export async function resetPasswordRecieve(token: string, password?: string) {
  const userId = await validateResetToken(token);
  if (!userId) {
    throw new InvalidResetPasswordTokenError();
  }

  const user = await userRepository.find({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new InvalidResetPasswordTokenError();
  }

  // Sent by FE to check whether user should be able to provide new password
  if (!password) {
    return false;
  }

  const passwordPwned = await isPasswordPwned(password);
  if (passwordPwned) {
    throw new PasswordPwnedError();
  }

  // Kill sessions and invalidate reset token
  await tokenRepository.deleteMany({
    userId,
    token,
    type: TokenType.RESET_PASSWORD,
  });
  await tokenRepository.deleteMany({
    userId,
    type: TokenType.REFRESH,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await userRepository.update(
    { id: userId },
    { password: hashedPassword, status: UserStatus.ACTIVE, lockedAt: null }
  );

  await messageQueueService.add(messageQueueService.TOPIC.EMAIL_NOTIFICATION, {
    recipient: user.email,
    templateId: TemplateIds.passwordChangeNotification,
  });

  return true;
}

async function validateResetToken(token: string) {
  try {
    const isExists = await tokenRepository.isTokenExists(
      token,
      TokenType.RESET_PASSWORD
    );
    if (!isExists) {
      return null;
    }

    const { userId } = await validateToken<{ userId: string }>(
      token,
      config.resetPasswordSecret
    );
    return userId;
  } catch {
    return null;
  }
}
