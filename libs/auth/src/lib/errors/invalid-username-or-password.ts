import { BadRequestException } from '@squaredash/shared/util';

export class InvalidUsernameOrPasswordError extends BadRequestException {
  constructor() {
    super(`IM0002`);
  }
}
