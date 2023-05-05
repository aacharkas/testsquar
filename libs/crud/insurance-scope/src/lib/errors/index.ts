import { NotFoundException } from '@squaredash/shared/util';

export class InsuranceScopeNotFoundError extends NotFoundException {
  constructor() {
    super('IM0053');
  }
}
