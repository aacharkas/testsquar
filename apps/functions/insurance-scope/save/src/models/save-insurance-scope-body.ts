import { IsIn } from 'class-validator';

import { ImportInsuranceScopeBody } from '../../../import/src/models/import-insurance-scope-body';
import { InsuranceScopeSaveMode } from './insurance-scope-save-mode';

export class SaveInsuranceScopeBody extends ImportInsuranceScopeBody {
  @IsIn(Object.values(InsuranceScopeSaveMode))
  mode: InsuranceScopeSaveMode;
}
