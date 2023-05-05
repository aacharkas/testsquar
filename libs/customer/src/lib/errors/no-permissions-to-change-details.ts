import { ForbiddenException } from '@squaredash/shared/util';

export class NoPermissionsToChangeDetailsError extends ForbiddenException {
  constructor() {
    super(`IM0047`);
  }
}
