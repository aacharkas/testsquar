import { BadRequestException } from '@squaredash/shared/util';

export class ProvidedEmailIsAlreadyInUseError extends BadRequestException {
  constructor() {
    super('IM0022');
  }
}
