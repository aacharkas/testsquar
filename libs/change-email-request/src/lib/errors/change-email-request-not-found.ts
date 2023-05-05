import { NotFoundException } from '@squaredash/shared/util';

export class ChangeEmailRequestNotFound extends NotFoundException {
  constructor() {
    super('IM0053');
  }
}
