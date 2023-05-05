import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { claimItemApproveSchema } from './claim-item-approve.schema';
import { claimItemCreateSchema } from './claim-item-create.schema';
import { claimItemListSchema } from './claim-item-list.schema';
import { claimItemRemoveSchema } from './claim-item-remove.schema';
import { claimItemUpdateSchema } from './claim-item-update.schema';

export const claimItemSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Claim Item',
    description: 'Claim Item Functions',
  },
  schemas: [
    claimItemCreateSchema,
    claimItemListSchema,
    claimItemRemoveSchema,
    claimItemUpdateSchema,
    claimItemApproveSchema,
  ],
};
