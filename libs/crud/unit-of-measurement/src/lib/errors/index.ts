import {
  BadRequestException,
  NotFoundException,
} from '@squaredash/shared/util';

export class UnitOfMeasurementUniqueNameError extends BadRequestException {
  constructor() {
    super('IM0017');
  }
}

export class UnitOfMeasurementNotFoundError extends NotFoundException {
  constructor() {
    super('IM0053');
  }
}
