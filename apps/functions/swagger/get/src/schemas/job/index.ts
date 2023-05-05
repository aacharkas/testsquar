import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { jobGetByIdSchema } from './job-get-by-id.schema';
import { jobLineItemsUpdate } from './job-line-items-update.schema';
import { jobListSchema } from './job-list.schema';
import { jobUpdateStatusSchema } from './job-update-status.schema';

export const jobSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Job',
    description: 'Job Functions',
  },
  schemas: [
    jobGetByIdSchema,
    jobLineItemsUpdate,
    jobUpdateStatusSchema,
    jobListSchema,
  ],
};
