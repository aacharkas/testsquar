import { UnitOfMeasurement as UnitOfMeasurementModel } from '@prisma/client';

import { exclude } from '@squaredash/shared/util';

import { UnitOfMeasurement } from '../models/unit-of-measurement';

export const unitOfMeasurementModelToUnitOfMeasurement = (
  model: UnitOfMeasurementModel
): UnitOfMeasurement => {
  return exclude(model, ['techStatus']);
};
