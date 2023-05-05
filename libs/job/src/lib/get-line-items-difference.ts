import { JobLineItem } from '@prisma/client';
import * as _ from 'lodash';

import { JobWithMeta } from '@squaredash/job';

export function getLineItemsDifference(
  source: JobWithMeta,
  target: JobWithMeta
) {
  const sourceItems = getLineItems(source);
  const targetItems = getLineItems(target);

  return {
    ...getChangedAndDeleted(sourceItems, targetItems),
    added: getAddedItems(sourceItems, targetItems),
  };
}

const getLineItems = (job: JobWithMeta) =>
  job.groups.flatMap((group) => group.lineItems);

function getChangedAndDeleted(
  sourceItems: JobLineItem[],
  targetItems: JobLineItem[]
) {
  const changed: JobLineItem[] = [];
  const deleted: JobLineItem[] = [];
  for (const item of sourceItems) {
    const existingItem = targetItems.find(
      (targetItem) => targetItem.id === item.id
    );

    if (existingItem) {
      if (!_.isEqual(item, existingItem)) {
        changed.push(existingItem);
      }
    } else {
      deleted.push(item);
    }
  }

  return {
    changed,
    deleted,
  };
}

function getAddedItems(sourceItems: JobLineItem[], targetItems: JobLineItem[]) {
  const added: JobLineItem[] = [];
  for (const item of targetItems) {
    const existingItem = sourceItems.find(
      (sourceItem) => item.id === sourceItem.id
    );

    if (!existingItem) {
      added.push(item);
    }
  }

  return added;
}
