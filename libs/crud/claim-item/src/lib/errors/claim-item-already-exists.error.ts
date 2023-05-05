import { BadRequestException } from '@squaredash/shared/util';

export class ClaimItemAlreadyExists extends BadRequestException {
  constructor() {
    super('IM0035');
  }
}
