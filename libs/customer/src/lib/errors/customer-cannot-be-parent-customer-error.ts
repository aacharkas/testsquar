import { BadRequestException } from '@squaredash/shared/util';

export class CustomerCannotBeParentCustomerError extends BadRequestException {
  constructor() {
    super(`IM0044`);
  }
}
