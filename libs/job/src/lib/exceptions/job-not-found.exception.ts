import { NotFoundException } from '@squaredash/shared/util';

export class JobNotFoundException extends NotFoundException {
  constructor() {
    super('IM0053');
  }
}
