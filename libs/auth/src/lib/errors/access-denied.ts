import { ForbiddenException } from '@squaredash/shared/util';

export class ForbiddenError extends ForbiddenException {
  constructor() {
    super(`FORBIDDEN`);
  }
}
