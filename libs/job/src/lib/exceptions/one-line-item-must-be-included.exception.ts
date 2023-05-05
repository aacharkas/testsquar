import { BadRequestException } from '@squaredash/shared/util';

export class OneLineItemMustBeIncludedException extends BadRequestException {
  constructor() {
    super('IM0079');
  }
}
