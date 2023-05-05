import { NotFoundException } from '@squaredash/shared/util';

export class CompanyNotFoundError extends NotFoundException {
  constructor() {
    super(`IM0053`);
  }
}
