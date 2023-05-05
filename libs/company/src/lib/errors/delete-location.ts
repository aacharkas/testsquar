import { BadRequestException } from '@squaredash/shared/util';

export class LocationDeletionError extends BadRequestException {
  constructor() {
    super(`COMPANY_LOCATION_DELETE`);
  }
}
