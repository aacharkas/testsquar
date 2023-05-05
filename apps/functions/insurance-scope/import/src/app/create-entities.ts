import { PrismaClient } from '@prisma/client';

import * as customerDraftService from '@squaredash/crud/customer-draft';
import * as insuranceCarrierAdjusterDraftService from '@squaredash/crud/insurance-carrier-adjuster-draft';
import * as insuranceCarrierDraftService from '@squaredash/crud/insurance-carrier-draft';
import { InsuranceScopeListItem } from '@squaredash/crud/insurance-scope';
import * as insuranceScopeDraftService from '@squaredash/crud/insurance-scope-draft';
import { prisma } from '@squaredash/shared/db';
import { ScopeContent } from '@squaredash/shared/models';

import {
  getCustomerPayload,
  getGroupInfos,
  getImportResponse,
  getInsuranceCarrierAdjustersInfo,
  getInsuranceCarrierInfo,
  getInsuranceScopePayload,
} from '../mappers';
import { ImportInsuranceScopeBody } from '../models/import-insurance-scope-body';
import { createGroups } from './create-groups';

export async function createEntities(
  content: ScopeContent,
  body: ImportInsuranceScopeBody,
  creatorId: string,
  companyId: string,
  versionId: string,
  tx: PrismaClient
): Promise<InsuranceScopeListItem> {
  const insuranceScopePayload = getInsuranceScopePayload(content);
  const insuranceScope = await insuranceScopeDraftService.create(
    {
      ...insuranceScopePayload,
      versionId,
      initialDocumentId: body.objectId,
      initialDocumentName: body.initialDocumentName,
      company: {
        connect: { id: companyId },
      },
    },
    tx
  );

  const insuranceCarrierPayload = getInsuranceCarrierInfo(content.companies[0]);
  const insuranceCarrier = await insuranceCarrierDraftService.create(
    {
      ...insuranceCarrierPayload,
      insuranceScopeDraft: { connect: { id: insuranceScope.id } },
    },
    tx
  );

  const customerPayload = getCustomerPayload(content.customers[0]);
  const customer = await customerDraftService.create(
    {
      ...customerPayload,
      insuranceScopeDraft: { connect: { id: insuranceScope.id } },
      responsibleUser: {
        connect: {
          id: creatorId,
        },
      },
    },
    tx
  );

  const adjusterPayloads = getInsuranceCarrierAdjustersInfo(
    insuranceCarrier.id,
    content.adjusters
  );
  await insuranceCarrierAdjusterDraftService.createMany(adjusterPayloads, tx);

  const groupsPayload = content.groups.map((group) =>
    getGroupInfos(insuranceScope.id, group)
  );

  await createGroups({
    scopeId: insuranceScope.id,
    groups: groupsPayload,
    tx,
  });

  return getImportResponse(insuranceScope, customer, insuranceCarrier);
}
