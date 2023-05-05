import { BadRequestException } from '@squaredash/shared/util';

export class InvalidUploadTypeError extends BadRequestException {
  constructor() {
    super('Invalid type of the upload');
  }
}
