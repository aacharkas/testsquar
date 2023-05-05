import { BadRequestException } from '@squaredash/shared/util';

export class CustomerWithDisplayNameAlreadyExistsError extends BadRequestException {
  constructor() {
    super(`IM0046`);
  }
}
