import { v4 } from 'uuid';

import { ScopeContent } from '@squaredash/shared/models';
import {
  BadRequestException,
  NotFoundException,
} from '@squaredash/shared/util';

import { getExistedInsuranceScope } from '../../../import/src/app/get-existed-insurance-scope';
import { InsuranceScopeSaveMode } from '../models/insurance-scope-save-mode';

export async function getVersionId(
  mode: InsuranceScopeSaveMode,
  companyId: string,
  content: ScopeContent
): Promise<string> {
  const newVersionId = v4();
  if (mode === InsuranceScopeSaveMode.NEW) {
    return newVersionId;
  }

  if (mode === InsuranceScopeSaveMode.NEW_VERSION) {
    const existedScope = await getExistedInsuranceScope(companyId, content);

    if (!existedScope) {
      throw new NotFoundException(
        'Version for provided insurance scope not found'
      );
    }

    return existedScope.versionId;
  }

  throw new BadRequestException('Invalid insurance scope save mode');
}
