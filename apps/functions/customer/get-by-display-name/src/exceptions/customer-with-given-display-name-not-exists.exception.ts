import { NotFoundException } from '@squaredash/shared/util';

export class CustomerWithGivenDisplayNameNotExistsException extends NotFoundException {
  constructor() {
    super('IM0063');
  }
}
