import { BadRequestException } from '@squaredash/shared/util';

export class EmailAlreadyInUseError extends BadRequestException {
  constructor() {
    super(`IM0022`);
  }
}
