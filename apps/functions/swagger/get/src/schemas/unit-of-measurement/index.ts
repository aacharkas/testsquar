import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { unitOfMeasurementCreateSchema } from './unit-of-measurement-create.schema';
import { unitOfMeasurementDeleteSchema } from './unit-of-measurement-delete.schema';
import { unitOfMeasurementGetSchema } from './unit-of-measurement-get.schema';
import { unitOfMeasurementListSchema } from './unit-of-measurement-list.schema';
import { unitOfMeasurementUpdateSchema } from './unit-of-measurement-update.schema';

export const unitOfMeasurementSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Unit of measurement',
    description: 'Unit of measurement Functions',
  },
  schemas: [
    unitOfMeasurementCreateSchema,
    unitOfMeasurementGetSchema,
    unitOfMeasurementListSchema,
    unitOfMeasurementUpdateSchema,
    unitOfMeasurementDeleteSchema,
  ],
};
