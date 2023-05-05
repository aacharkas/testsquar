import { PrismaClient } from '@prisma/client';

import * as insuranceScopeGroupDraftService from '@squaredash/crud/insurance-scope-group-draft';
import * as insuranceScopeLineItemDraftService from '@squaredash/crud/insurance-scope-line-item-draft';

interface CreateGroupsPayload {
  scopeId: string;
  groups: any[];
  parentId?: string;
  tx?: PrismaClient;
}

export async function createGroups(
  payload: CreateGroupsPayload
): Promise<void> {
  for (const {
    groups: childGroups,
    items,
    ...groupPayload
  } of payload.groups) {
    const parentGroup = await insuranceScopeGroupDraftService.create(
      {
        ...groupPayload,
        ...(payload.parentId
          ? {
              parent: {
                connect: {
                  id: payload.parentId,
                },
              },
            }
          : {}),
        insuranceScopeDraft: {
          connect: {
            id: payload.scopeId,
          },
        },
      },
      payload.tx
    );

    const itemPayloads = items.map((item) => ({
      ...item,
      insuranceScopeGroupDraftId: parentGroup.id,
      insuranceScopeDraftId: payload.scopeId,
    }));
    await insuranceScopeLineItemDraftService.createMany(
      itemPayloads,
      payload.tx
    );

    if (childGroups.length) {
      await createGroups({
        scopeId: payload.scopeId,
        groups: childGroups,
        parentId: parentGroup.id,
        tx: payload.tx,
      });
    }
  }
}
