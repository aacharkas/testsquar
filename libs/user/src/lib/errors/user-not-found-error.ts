import { BadRequestException } from '@squaredash/shared/util';

export class UserNotFoundError extends BadRequestException {
  constructor() {
    super(`IM0053`);
  }
}
