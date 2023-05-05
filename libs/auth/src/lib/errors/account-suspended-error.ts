import { ForbiddenException } from '@squaredash/shared/util';

export class AccountSuspendedError extends ForbiddenException {
  constructor() {
    super(`IM0034`);
  }
}
