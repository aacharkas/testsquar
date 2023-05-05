import { BadRequestException } from '@squaredash/shared/util';

export class AccountIsNotActivatedError extends BadRequestException {
  constructor() {
    super(`IM0055`);
  }
}
