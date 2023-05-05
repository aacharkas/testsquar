import { BadRequestException } from '@squaredash/shared/util';

export class UserAlreadyExistsError extends BadRequestException {
  constructor() {
    super(`EMAIL_TAKEN`);
  }
}
