import { User } from '@prisma/client';

import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { Config, TemplateIds, generateJwtToken } from '@squaredash/shared/util';

import { mergeToken } from './helpers';

const config = { ...Config.APP, ...Config.JWT };

export async function resendConfirmationEmail(
  user: Omit<User, 'password' | 'techStatus'>
) {
  const newToken = generateJwtToken(
    { userId: user.id },
    config.confirmationExpiresIn,
    config.confirmationSecret
  );

  const token = await mergeToken({
    token: newToken,
    userId: user.id,
    type: 'CONFIRMATION',
  });

  await messageQueueService.add(TOPIC.EMAIL_NOTIFICATION, {
    recipient: user.email,
    templateId: TemplateIds.verifyEmail,
    data: {
      name: user.name,
      confirmationUrl: `${config.url}/login/company-signup?token=${token.token}`,
    },
  });
}
