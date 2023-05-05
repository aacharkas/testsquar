import { BadRequestException } from '@squaredash/shared/util';

// TODO: make throwable in company namespace
export class NonExistentCompanyError extends BadRequestException {
  constructor() {
    super(`COMPANY_NOT_FOUND`);
  }
}
