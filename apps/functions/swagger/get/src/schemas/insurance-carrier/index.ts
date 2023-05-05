import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { insuranceCarrierCreateSchema } from './insurance-carrier-create.schema';
import { insuranceCarrierDeleteSchema } from './insurance-carrier-delete.schema';
import { insuranceCarrierGetByNameSchema } from './insurance-carrier-get-by-name.schema';
import { insuranceCarrierGetSchema } from './insurance-carrier-get.schema';
import { insuranceCarrierListSchema } from './insurance-carrier-list.schema';
import { insuranceCarrierUpdateSchema } from './insurance-carrier-update.schema';

export const insuranceCarrierSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Insurance Carrier',
    description: 'Insurance Carrier Functions',
  },
  schemas: [
    insuranceCarrierCreateSchema,
    insuranceCarrierGetSchema,
    insuranceCarrierListSchema,
    insuranceCarrierUpdateSchema,
    insuranceCarrierDeleteSchema,
    insuranceCarrierGetByNameSchema,
  ],
};
