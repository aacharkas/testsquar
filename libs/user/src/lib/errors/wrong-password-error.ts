import { BadRequestException } from '@squaredash/shared/util';

export class WrongPasswordError extends BadRequestException {
  constructor() {
    super(`IM0049`);
  }
}
