import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { userChangePasswordSchema } from './user-change-password.schema';
import { userDeleteSchema } from './user-delete.schema';
import { userGetSchema } from './user-get.schema';
import { userListSchema } from './user-list.schema';
import { userStatusUpdateSchema } from './user-status-update.schema';
import { userUpdateSchema } from './user-update.schema';

export const userSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'User',
    description: 'User Functions',
  },
  schemas: [
    userGetSchema,
    userListSchema,
    userStatusUpdateSchema,
    userUpdateSchema,
    userChangePasswordSchema,
    userDeleteSchema,
  ],
};
