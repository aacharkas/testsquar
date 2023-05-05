import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { jobContractCreateSchema } from './job-contract-create.schema';
import { jobContractDeleteSchema } from './job-contract-delete.schema';
import { jobContractGetByJobIdSchema } from './job-contract-get-by-job-id.schema';

export const jobContractSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Job Contract',
    description: 'Job Contract Functions',
  },
  schemas: [
    jobContractCreateSchema,
    jobContractDeleteSchema,
    jobContractGetByJobIdSchema,
  ],
};
