import { BadRequestException } from '@squaredash/shared/util';

export class CompanyWithNameAlreadyExistsError extends BadRequestException {
  constructor() {
    super(`IM0014`);
  }
}
