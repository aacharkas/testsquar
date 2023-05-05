import { InsuranceScopeStatus, PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

import * as insuranceScopeDraftService from '@squaredash/crud/insurance-scope-draft';
import { ScopeContent } from '@squaredash/shared/models';
import { ConflictException } from '@squaredash/shared/util';

import { getExistedInsuranceScope } from './get-existed-insurance-scope';

export async function handleNewVersionCreation(
  companyId: string,
  content: ScopeContent,
  tx: PrismaClient
): Promise<string> {
  const existedScope = await getExistedInsuranceScope(companyId, content);

  if (!existedScope) {
    return v4();
  }

  if (existedScope.status === InsuranceScopeStatus.IMPORTED) {
    await insuranceScopeDraftService.deleteById(existedScope.id, tx);
    return existedScope.versionId;
  }

  throw new ConflictException('IM0057', {
    claimNumber: existedScope.claimNumber,
    insuranceCarrierName: existedScope.insuranceCarrierName,
  });
}
