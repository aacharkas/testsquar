import { NotFoundException } from '@squaredash/shared/util';

export class CompanyLocationNotFoundError extends NotFoundException {
  constructor() {
    super(`IM0053`);
  }
}
