import { addressCreateOrConnect, exclude } from '@squaredash/shared/util';

import { InvitationSendPayload } from '../interfaces/invitation-send-payload';

export const mapInvitationSendPayloadToCreateUserInput = (
  payload: InvitationSendPayload
) => {
  const mapped = {
    ...payload,
    Address: payload.address
      ? addressCreateOrConnect(payload.address)
      : undefined,
  };
  return exclude(mapped, ['address']);
};
