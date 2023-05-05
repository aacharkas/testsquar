import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { customerCreateSchema } from './customer-create.schema';
import { customerDeleteSchema } from './customer-delete.schema';
import { customerGetByDisplayNameSchema } from './customer-get-by-display-name.schema';
import { customerGetSchema } from './customer-get.schema';
import { customerListSchema } from './customer-list.schema';
import { customerUpdateSchema } from './customer-update.schema';

export const customerSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Customer',
    description: 'Customer Functions',
  },
  schemas: [
    customerCreateSchema,
    customerGetSchema,
    customerListSchema,
    customerUpdateSchema,
    customerDeleteSchema,
    customerGetByDisplayNameSchema,
  ],
};
