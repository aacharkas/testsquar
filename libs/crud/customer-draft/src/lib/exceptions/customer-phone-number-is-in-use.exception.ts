import { BadRequestException } from '@squaredash/shared/util';

export class CustomerPhoneNumberIsInUseException extends BadRequestException {
  constructor() {
    super('IM0045');
  }
}
