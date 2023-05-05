import { NotFoundException } from '@squaredash/shared/util';

export class InsuranceCarrierNotFoundError extends NotFoundException {
  constructor() {
    super(`IM0053`);
  }
}
