import * as userCrud from '@squaredash/crud/user';

import { InvalidInvitationTokenError } from './errors';
import { getInvitationFromToken } from './get-from-token';

export async function recieve(invitationToken: string) {
  const invitation = await getInvitationFromToken(invitationToken);
  if (!invitation) {
    throw new InvalidInvitationTokenError();
  }

  const user = await userCrud.find({
    where: { email: invitation.email },
  });

  if (!user || user.status !== 'ACTIVE' || !invitation.companyId) {
    return {
      action: 'REDIRECT',
    };
  }

  await userCrud.update(
    {
      email: invitation.email,
    },
    {
      Company: {
        connect: {
          id: invitation.companyId,
        },
      },
      role: invitation.role,
    }
  );
  return {
    action: 'UPDATED',
  };
}
