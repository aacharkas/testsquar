import { BadRequestException } from '@squaredash/shared/util';

export class PasswordPwnedError extends BadRequestException {
  constructor() {
    super(`IM0005`);
  }
}
