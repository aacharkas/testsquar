import * as claimItemService from '@squaredash/crud/claim-item';
import { NotFoundException } from '@squaredash/shared/util';

export async function approve(claimItemId: string): Promise<void> {
  const claimItem = await claimItemService.find({ id: claimItemId });
  if (!claimItem) {
    throw new NotFoundException('IM0053');
  }

  await claimItemService.update({ id: claimItem.id }, { reviewed: true });
}
