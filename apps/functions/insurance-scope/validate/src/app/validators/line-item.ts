import { isNumber } from 'class-validator';

import {
  InsuranceScopeGroupInfo,
  InsuranceScopeLineItemInfo,
  InsuranceScopeWithMeta,
} from '@squaredash/crud/insurance-scope';
import { InsuranceScopeValidationType } from '@squaredash/shared/models';
import { ValidationNotification } from '@squaredash/shared/models';

import { roundFloat, sendNotificationToChannel } from '../utils';

type GroupTotal = {
  totalTax: number;
  totalRCV: number;
  totalOverhead: number;
  totalACV: number;
  totalDepreciationSum: number;
};

function isGroupTotal(obj): obj is GroupTotal {
  return (
    obj &&
    (obj as GroupTotal).totalACV !== undefined &&
    (obj as GroupTotal).totalTax !== undefined &&
    (obj as GroupTotal).totalRCV !== undefined &&
    (obj as GroupTotal).totalOverhead !== undefined &&
    (obj as GroupTotal).totalDepreciationSum !== undefined
  );
}

function isValidationNotification(obj): obj is ValidationNotification {
  return (
    obj &&
    (obj as ValidationNotification).code !== undefined &&
    (obj as ValidationNotification).type !== undefined &&
    (obj as ValidationNotification).property !== undefined
  );
}

export async function lineItemValidate(insuranceScope: InsuranceScopeWithMeta) {
  const notifications = [];
  for (const group of insuranceScope.groups) {
    await groupValidate(insuranceScope, group, notifications);
  }
  return notifications;
}

async function groupValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo,
  notifications: ValidationNotification[]
): Promise<ValidationNotification[] | GroupTotal> {
  const groupTotal = {
    totalTax: 0,
    totalRCV: 0,
    totalOverhead: 0,
    totalACV: 0,
    totalDepreciationSum: 0,
  };
  for (const currentGroup of group.groups) {
    const groupResult = await groupValidate(
      insuranceScope,
      currentGroup,
      notifications
    );
    if (isGroupTotal(groupResult)) {
      groupTotal.totalTax += groupResult.totalTax;
      groupTotal.totalRCV += groupResult.totalRCV;
      groupTotal.totalOverhead += groupResult.totalOverhead;
      groupTotal.totalACV += groupResult.totalACV;
      groupTotal.totalDepreciationSum += groupResult.totalDepreciationSum;
    } else {
      return groupResult;
    }
  }
  for (const item of group.items) {
    const lineItemValidationResult = await Promise.all([
      lineItemDescriptionValidate(insuranceScope, item),
      lineItemNotesValidate(insuranceScope, item),
      lineItemQuantityValidate(insuranceScope, item),
      lineItemUnitPriceValidate(insuranceScope, item),
      lineItemTaxValidate(insuranceScope, item),
      lineItemOverheadValidate(insuranceScope, item),
      lineItemRcvValidate(insuranceScope, item),
      lineItemAcvValidate(insuranceScope, item),
      lineItemDepreciationPercentValidate(insuranceScope, item),
      lineItemDepreciationSumValidate(insuranceScope, item),
    ]);
    notifications.push(...lineItemValidationResult);
    const failedNotifications = lineItemValidationResult.filter(
      (notification) => notification.type !== InsuranceScopeValidationType.log
    );
    if (failedNotifications.length) {
      return notifications;
    } else {
      groupTotal.totalTax += item.tax;
      groupTotal.totalRCV += item.rcv;
      groupTotal.totalOverhead += item.overhead;
      groupTotal.totalACV += item.acv;
      groupTotal.totalDepreciationSum += item.depreciationSum;
    }
  }
  groupTotal.totalTax = roundFloat(groupTotal.totalTax, 2);
  groupTotal.totalRCV = roundFloat(groupTotal.totalRCV, 2);
  groupTotal.totalOverhead = roundFloat(groupTotal.totalOverhead, 2);
  groupTotal.totalACV = roundFloat(groupTotal.totalACV, 2);
  groupTotal.totalDepreciationSum = roundFloat(
    groupTotal.totalDepreciationSum,
    2
  );
  const groupValidationResult = await Promise.all([
    groupNameValidate(insuranceScope, group),
    groupNoteValidate(insuranceScope, group),
    groupTotalTaxValidate(insuranceScope, group, groupTotal),
    groupTotalRcvValidate(insuranceScope, group, groupTotal),
    groupTotalOverheadValidate(insuranceScope, group, groupTotal),
    groupTotalAcvValidate(insuranceScope, group, groupTotal),
    groupTotalDepreciationSumValidate(insuranceScope, group, groupTotal),
  ]);
  notifications.push(...groupValidationResult);
  if (
    groupValidationResult.find((result) => isValidationNotification(result))
  ) {
    return groupValidationResult;
  }
  return groupTotal;
}

async function groupNameValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo
): Promise<ValidationNotification> {
  const maxLength = 200;
  if (typeof group.name !== 'string' || group.name.length > maxLength) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'groupNameValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupNameValidate',
  });
}

async function groupNoteValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo
): Promise<ValidationNotification> {
  const maxLength = 500;
  if (typeof group.notes !== 'string' || group.notes.length > maxLength) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'groupNoteValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupNoteValidate',
  });
}

async function lineItemDescriptionValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  const maxLength = 256;
  if (
    typeof item.description !== 'string' ||
    item.description.length > maxLength
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'lineItemDescriptionValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemDescriptionValidate',
  });
}

async function lineItemNotesValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  const maxLength = 500;
  if (typeof item.notes !== 'string' || item.notes.length > maxLength) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'lineItemNotesValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemNotesValidate',
  });
}

async function lineItemQuantityValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.quantity) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemQuantityValidate',
    });
  }
  if (!isNumber(item.quantity, { maxDecimalPlaces: 2 }) || item.quantity <= 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemQuantityValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemQuantityValidate',
  });
}

async function lineItemUnitPriceValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.unitPrice) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemUnitPriceValidate',
    });
  }

  if (
    !isNumber(item.unitPrice, { maxDecimalPlaces: 2 }) ||
    item.unitPrice <= 0
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemUnitPriceValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemUnitPriceValidate',
  });
}

async function lineItemDepreciationPercentValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.depreciationPercentage) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemDepreciationPercentValidate',
    });
  }

  if (
    !isNumber(item.depreciationPercentage, { maxDecimalPlaces: 2 }) ||
    item.unitPrice < 0
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemDepreciationPercentValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemDepreciationPercentValidate',
  });
}

async function lineItemDepreciationSumValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.depreciationSum) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemDepreciationSumValidate',
    });
  }

  if (
    !isNumber(item.depreciationSum, { maxDecimalPlaces: 2 }) ||
    item.depreciationSum < 0
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemDepreciationSumValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemDepreciationSumValidate',
  });
}

async function lineItemTaxValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.tax) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemTaxValidate',
    });
  }

  if (!isNumber(item.tax, { maxDecimalPlaces: 2 }) || item.tax < 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemTaxValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemTaxValidate',
  });
}

async function lineItemOverheadValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.overhead) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemOverheadValidate',
    });
  }

  if (!isNumber(item.overhead, { maxDecimalPlaces: 2 }) || item.overhead < 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemOverheadValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemOverheadValidate',
  });
}

async function lineItemRcvValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.rcv) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemRcvValidate',
    });
  }

  if (!isNumber(item.rcv, { maxDecimalPlaces: 2 }) || item.rcv <= 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemRcvValidate',
    });
  }
  const expectedRCV = roundFloat(
    item.quantity * item.unitPrice + (item.tax || 0) + (item.overhead || 0),
    2
  );
  if (item.rcv !== expectedRCV) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemRcvValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemRcvValidate',
  });
}

async function lineItemAcvValidate(
  insuranceScope: InsuranceScopeWithMeta,
  item: InsuranceScopeLineItemInfo
): Promise<ValidationNotification> {
  if (!item.acv) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemAcvValidate',
    });
  }
  if (!isNumber(item.acv, { maxDecimalPlaces: 2 }) || item.acv <= 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemAcvValidate',
    });
  }
  const expectedACV = roundFloat(item.rcv - item.depreciationSum, 2);
  if (item.acv !== expectedACV) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: item.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemAcvValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: item.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemAcvValidate',
  });
}

async function groupTotalTaxValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo,
  groupTotal: GroupTotal
): Promise<ValidationNotification> {
  if (!group.totalTax && groupTotal.totalTax === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'groupTotalTaxValidate',
    });
  }
  if (group.totalTax !== groupTotal.totalTax) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'groupTotalTaxValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupTotalTaxValidate',
  });
}

async function groupTotalRcvValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo,
  groupTotal: GroupTotal
): Promise<ValidationNotification> {
  if (!group.totalRCV && groupTotal.totalRCV === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'groupTotalRcvValidate',
    });
  }
  if (group.totalRCV !== groupTotal.totalRCV) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'groupTotalRcvValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupTotalRcvValidate',
  });
}

async function groupTotalOverheadValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo,
  groupTotal: GroupTotal
): Promise<ValidationNotification> {
  if (!group.overhead && groupTotal.totalOverhead === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'groupTotalOverheadValidate',
    });
  }
  if (group.overhead !== groupTotal.totalOverhead) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'groupTotalOverheadValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupTotalOverheadValidate',
  });
}

async function groupTotalAcvValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo,
  groupTotal: GroupTotal
): Promise<ValidationNotification> {
  if (!group.totalACV && groupTotal.totalACV === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'groupTotalAcvValidate',
    });
  }
  if (group.totalACV !== groupTotal.totalACV) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'groupTotalAcvValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupTotalAcvValidate',
  });
}

async function groupTotalDepreciationSumValidate(
  insuranceScope: InsuranceScopeWithMeta,
  group: InsuranceScopeGroupInfo,
  groupTotal: GroupTotal
): Promise<ValidationNotification> {
  if (!group.depreciation && groupTotal.totalDepreciationSum === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'groupTotalDepreciationSumValidate',
    });
  }
  if (group.depreciation !== groupTotal.totalDepreciationSum) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: group.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'groupTotalDepreciationSumValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: group.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'groupTotalDepreciationSumValidate',
  });
}
