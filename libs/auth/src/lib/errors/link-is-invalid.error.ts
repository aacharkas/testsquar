import { BadRequestException } from '@squaredash/shared/util';

export class LinkIsInvalidError extends BadRequestException {
  constructor() {
    super('IM0006');
  }
}
