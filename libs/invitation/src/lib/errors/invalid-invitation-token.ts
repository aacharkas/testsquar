import { BadRequestException } from '@squaredash/shared/util';

export class InvalidInvitationTokenError extends BadRequestException {
  constructor() {
    super(`INVALID_INVITATION_TOKEN`);
  }
}
