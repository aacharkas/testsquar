import { BadRequestException } from '@squaredash/shared/util';

export class CustomerEmailIsInUseException extends BadRequestException {
  constructor() {
    super('IM0022');
  }
}
