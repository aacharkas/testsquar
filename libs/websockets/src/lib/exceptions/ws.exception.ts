import { InternalServerErrorException } from '@squaredash/shared/util';

export class WsException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
