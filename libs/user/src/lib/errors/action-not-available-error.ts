import { BadRequestException } from '@squaredash/shared/util';

export class ActionNotAvailableError extends BadRequestException {
  constructor() {
    super(`IM0054`);
  }
}
