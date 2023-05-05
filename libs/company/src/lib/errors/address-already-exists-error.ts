import { BadRequestException } from '@squaredash/shared/util';

export class AddressAlreadyExistsError extends BadRequestException {
  constructor() {
    super(`IM0023`);
  }
}
