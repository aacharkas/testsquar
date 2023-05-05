import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { superAdminListSchema } from './super-admin-list.schema';

export const superAdminSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Super Admin',
    description: 'Super Admin Functions',
  },
  schemas: [superAdminListSchema],
};
