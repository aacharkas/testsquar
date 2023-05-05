import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { companyCreateSchema } from './company-create.schema';
import { companyGetSchema } from './company-get.schema';
import { companyInviteSchema } from './company-invite.schema';
import { companyListSchema } from './company-list.schema';
import { companyLocationCreateSchema } from './company-location-create.schema';
import { companyLocationDeleteSchema } from './company-location-delete.schema';
import { companyLocationGetSchema } from './company-location-get.schema';
import { companyLocationUpdateSchema } from './company-location-update.schema';
import { companyStatusUpdateSchema } from './company-status-update.schema';
import { companyUpdateSchema } from './company-update.schema';

export const companySchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Company',
    description: 'Company Functions',
  },
  schemas: [
    companyCreateSchema,
    companyGetSchema,
    companyListSchema,
    companyLocationCreateSchema,
    companyLocationGetSchema,
    companyLocationUpdateSchema,
    companyLocationDeleteSchema,
    companyUpdateSchema,
    companyInviteSchema,
    companyStatusUpdateSchema,
  ],
};
