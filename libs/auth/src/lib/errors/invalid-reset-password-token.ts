import { BadRequestException } from '@squaredash/shared/util';

export class InvalidResetPasswordTokenError extends BadRequestException {
  constructor() {
    super(`INVALID_RESET_PASSWORD_TOKEN`);
  }
}
