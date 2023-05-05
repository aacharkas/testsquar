import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import { InsuranceScopeListItem } from '@squaredash/crud/insurance-scope';
import { Nullable } from '@squaredash/shared/interfaces';
import { ScopeContent } from '@squaredash/shared/models';

import { getInsuranceCarrierInfo, getInsuranceScopePayload } from '../mappers';

export async function getExistedInsuranceScope(
  companyId: string,
  content: ScopeContent
): Promise<Nullable<InsuranceScopeListItem>> {
  const insuranceScopePayload = getInsuranceScopePayload(content);
  const insuranceCarrierPayload = getInsuranceCarrierInfo(content.companies[0]);
  // If no claimNumber or insuranceCarrierName we cannot check is scope exists
  if (!(insuranceScopePayload.claimNumber && insuranceCarrierPayload.name)) {
    return null;
  }

  return insuranceScopeService.findExistedVersion({
    companyId,
    claimNumber: insuranceScopePayload.claimNumber,
    insuranceCarrierName: insuranceCarrierPayload.name,
  });
}
