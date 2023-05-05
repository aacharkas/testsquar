import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { insuranceScopeCarrierAdjusterCreateSchema } from './insurance-scope-carrier-adjuster-create.schema';
import { insuranceScopeCarrierAdjsterDeleteSchema } from './insurance-scope-carrier-adjuster-delete.schema';
import { insuranceScopeCarrierAdjsterUpdateSchema } from './insurance-scope-carrier-adjuster-update.schema';
import { insuranceScopeCarrierUpdateSchema } from './insurance-scope-carrier-update.schema';
import { insuranceScopeCustomerUpdateSchema } from './insurance-scope-customer-update.schema';
import { insuranceScopeGetSchema } from './insurance-scope-get.schema';
import { insuranceScopeGroupCreateSchema } from './insurance-scope-group-create.schema';
import { insuranceScopeGroupDeleteSchema } from './insurance-scope-group-delete.schema';
import { insuranceScopeGroupUpdateSchema } from './insurance-scope-group-update.schema';
import { insuranceScopeImportSchema } from './insurance-scope-import.schema';
import { insuranceScopeLineItemCreateSchema } from './insurance-scope-line-item-create.schema';
import { insuranceScopeLineItemDeleteSchema } from './insurance-scope-line-item-delete.schema';
import { insuranceScopeLineItemUpdateSchema } from './insurance-scope-line-item-update.schema';
import { insuranceScopeListSchema } from './insurance-scope-list.schema';
import { insuranceScopeSaveCustomerSchema } from './insurance-scope-save-customer.schema';
import { insuranceScopeSaveSchema } from './insurance-scope-save.schema';
import { insuranceScopeUpdateStatusSchema } from './insurance-scope-update-status.schema';
import { insuranceScopeUpdateSchema } from './insurance-scope-update.schema';
import { insuranceScopeValidateAccuracySchema } from './insurance-scope-validate-accuracy';
import { insuranceScopeValidateAccuracyResultsSchema } from './insurance-scope-validate-accuracy-results';

export const insuranceScopeSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Insurance Scope',
    description: 'Insurance Scope Functions',
  },
  schemas: [
    insuranceScopeImportSchema,
    insuranceScopeSaveSchema,
    insuranceScopeListSchema,
    insuranceScopeGetSchema,
    insuranceScopeUpdateSchema,
    insuranceScopeUpdateStatusSchema,
    insuranceScopeSaveCustomerSchema,
    insuranceScopeGroupDeleteSchema,
    insuranceScopeGroupCreateSchema,
    insuranceScopeGroupUpdateSchema,
    insuranceScopeLineItemCreateSchema,
    insuranceScopeLineItemUpdateSchema,
    insuranceScopeLineItemDeleteSchema,
    insuranceScopeCarrierUpdateSchema,
    insuranceScopeCustomerUpdateSchema,
    insuranceScopeCarrierAdjusterCreateSchema,
    insuranceScopeCarrierAdjsterUpdateSchema,
    insuranceScopeCarrierAdjsterDeleteSchema,
    insuranceScopeValidateAccuracySchema,
    insuranceScopeValidateAccuracyResultsSchema,
  ],
};
