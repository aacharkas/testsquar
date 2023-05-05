import { BadRequestException } from '@squaredash/shared/util';

export class LocationUpdateError extends BadRequestException {
  constructor() {
    super(`IM0020`);
  }
}
