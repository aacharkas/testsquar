import { BadRequestException } from '@squaredash/shared/util';

export class CustomerWithPhoneAlreadyExistsError extends BadRequestException {
  constructor() {
    super(`IM0045`);
  }
}
