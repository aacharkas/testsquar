import { BadRequestException } from '@squaredash/shared/util';

export class InvalidContentTypeError extends BadRequestException {
  constructor() {
    super('IM0030');
  }
}
