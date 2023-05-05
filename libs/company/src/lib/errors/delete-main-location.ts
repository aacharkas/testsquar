import { BadRequestException } from '@squaredash/shared/util';

export class MainLocationDeletionError extends BadRequestException {
  constructor() {
    super(`MAIN_COMPANY_LOCATION_DELETE`);
  }
}
