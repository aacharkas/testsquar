import { Prisma } from '@prisma/client';

import { BadRequestException } from '@squaredash/shared/util';

import { CreateInsuranceScopeLineItemBody } from '../models/create-insurance-scope-line-item-body';

export const getCreationPayload = (
  { claimItem, claimItemId, ...body }: CreateInsuranceScopeLineItemBody,
  insuranceScopeId: string,
  groupId: string
): Prisma.InsuranceScopeLineItemDraftCreateInput => {
  if (claimItem && claimItemId) {
    throw new BadRequestException(
      'Cannot be provided both arguments claimItem & claimItemId'
    );
  }

  const payload: Prisma.InsuranceScopeLineItemDraftCreateInput = {
    ...body,
    insuranceScopeDraft: {
      connect: { id: insuranceScopeId },
    },
    insuranceScopeGroupDraft: {
      connect: { id: groupId },
    },
  };

  if (claimItemId) {
    payload.claimItem = {
      connect: { id: claimItemId },
    };
  }

  if (claimItem) {
    payload.claimItem = {
      create: claimItem,
    };
  }

  return payload;
};
