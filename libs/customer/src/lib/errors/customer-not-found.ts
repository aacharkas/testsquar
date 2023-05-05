import { NotFoundException } from '@squaredash/shared/util';

export class CustomerNotFoundError extends NotFoundException {
  constructor() {
    super(`IM0053`);
  }
}
