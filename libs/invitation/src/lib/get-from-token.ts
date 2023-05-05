import { InvitationTokenPayload } from '@squaredash/shared/interfaces';
import { Config, validateToken } from '@squaredash/shared/util';

import { InvalidInvitationTokenError } from './errors';
import { find } from './find';

const config = Config.JWT;

export async function getInvitationFromToken(
  invitationToken: string | undefined
) {
  try {
    if (!invitationToken) {
      return null;
    }
    const payload = await validateToken<InvitationTokenPayload>(
      invitationToken,
      config.invitationSecret
    );

    return find({
      id: payload.invitationId,
    });
  } catch (e) {
    throw new InvalidInvitationTokenError();
  }
}
