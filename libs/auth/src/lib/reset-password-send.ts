import { TokenType, User } from '@prisma/client';

import * as messageQueueService from '@squaredash/message-queue';
import { Config, TemplateIds, generateJwtToken } from '@squaredash/shared/util';

// TODO: move to token crud.
import * as tokenRepository from './repository/token';

const config = { ...Config.JWT, ...Config.APP };

export async function resetPasswordSend(user: Omit<User, 'password'>) {
  if (!user) {
    return;
  }

  const newToken = generateJwtToken(
    {
      userId: user.id,
    },
    config.resetPasswordExpiresIn,
    config.resetPasswordSecret
  );

  const { token } = await tokenRepository.merge({
    token: newToken,
    userId: user.id,
    type: TokenType.RESET_PASSWORD,
  });
  // enabling CI

  await messageQueueService.add(messageQueueService.TOPIC.EMAIL_NOTIFICATION, {
    recipient: user.email,
    templateId: TemplateIds.resetPassword,
    data: {
      resetUrl: `${config.url}/login/reset-password?token=${token}`,
    },
  });
}
