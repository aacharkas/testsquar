import { isNumber } from 'class-validator';

import {
  InsuranceScopeGroupInfo,
  InsuranceScopeWithMeta,
} from '@squaredash/crud/insurance-scope';
import { InsuranceScopeValidationType } from '@squaredash/shared/models';
import { ValidationNotification } from '@squaredash/shared/models';

import { roundFloat, sendNotificationToChannel } from '../utils';

type Total = {
  totalLineItems: number;
  totalTax: number;
  totalRCV: number;
  totalACV: number;
  totalDepreciationSum: number;
  totalOverhead: number;
};

export async function totalValidate(insuranceScope: InsuranceScopeWithMeta) {
  const total = calculateTotal(insuranceScope.groups, {
    totalLineItems: 0,
    totalTax: 0,
    totalRCV: 0,
    totalACV: 0,
    totalDepreciationSum: 0,
    totalOverhead: 0,
  });

  return Promise.all([
    lineItemsTotalValidate(insuranceScope, total),
    totalTaxValidate(insuranceScope, total),
    totalRcvValidate(insuranceScope, total),
    totalDepreciationSumValidate(insuranceScope, total),
    deductibleValidate(insuranceScope),
    totalAcvValidate(insuranceScope, total),
    netClaimSumValidate(insuranceScope),
    totalRecoverableDeprecationSumValidate(insuranceScope),
    totalNonRecoverableDeprecationSumValidate(insuranceScope),
    netClaimIfDeprecationIsRecoveredValidate(insuranceScope),
  ]);
}

function calculateTotal(
  groups: InsuranceScopeGroupInfo[],
  groupTotal: Total
): Total {
  for (const currentGroup of groups) {
    const groupResult = calculateTotal(currentGroup.groups, groupTotal);
    for (const item of currentGroup.items) {
      groupTotal.totalTax += item.tax;
      groupTotal.totalRCV += item.rcv;
      groupTotal.totalLineItems += item.unitPrice * item.quantity;
      groupTotal.totalACV += item.acv;
      groupTotal.totalDepreciationSum += item.depreciationSum;
      groupTotal.totalOverhead += item.overhead;
    }
    groupTotal.totalTax = roundFloat(groupResult.totalTax, 2);
    groupTotal.totalRCV = roundFloat(groupResult.totalRCV, 2);
    groupTotal.totalLineItems = roundFloat(groupResult.totalLineItems, 2);
    groupTotal.totalACV = roundFloat(groupResult.totalACV, 2);
    groupTotal.totalDepreciationSum = roundFloat(
      groupResult.totalDepreciationSum,
      2
    );
    groupTotal.totalOverhead = roundFloat(groupResult.totalOverhead, 2);
  }
  return groupTotal;
}

async function lineItemsTotalValidate(
  insuranceScope: InsuranceScopeWithMeta,
  total: Total
): Promise<ValidationNotification> {
  if (!insuranceScope.totalLineItems && total.totalLineItems === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'lineItemsTotalValidate',
    });
  }
  if (total.totalLineItems !== insuranceScope.totalLineItems) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'lineItemsTotalValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'lineItemsTotalValidate',
  });
}

async function totalTaxValidate(
  insuranceScope: InsuranceScopeWithMeta,
  total: Total
): Promise<ValidationNotification> {
  if (!insuranceScope.totalTax && total.totalTax === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'totalTaxValidate',
    });
  }

  if (total.totalTax !== insuranceScope.totalTax) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'totalTaxValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'totalTaxValidate',
  });
}

async function totalRcvValidate(
  insuranceScope: InsuranceScopeWithMeta,
  total: Total
): Promise<ValidationNotification> {
  if (!insuranceScope.totalRcv && total.totalRCV === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'totalRcvValidate',
    });
  }

  if (
    total.totalRCV !== insuranceScope.totalRcv &&
    insuranceScope.totalRcv !==
      roundFloat(
        insuranceScope.totalLineItems +
          insuranceScope.totalTax +
          total.totalOverhead,
        2
      )
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'totalRcvValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'totalRcvValidate',
  });
}

async function totalDepreciationSumValidate(
  insuranceScope: InsuranceScopeWithMeta,
  total: Total
): Promise<ValidationNotification> {
  if (!insuranceScope.totalDepreciation && total.totalDepreciationSum === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'totalDepreciationSumValidate',
    });
  }

  if (total.totalDepreciationSum !== insuranceScope.totalDepreciation) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'totalDepreciationSumValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'totalDepreciationSumValidate',
  });
}

async function deductibleValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  if (
    !isNumber(insuranceScope.deductible, { maxDecimalPlaces: 2 }) ||
    insuranceScope.deductible < 0
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'deductibleValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'deductibleValidate',
  });
}

async function totalAcvValidate(
  insuranceScope: InsuranceScopeWithMeta,
  total: Total
): Promise<ValidationNotification> {
  if (!insuranceScope.totalAcv && total.totalACV === 0) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'totalAcvValidate',
    });
  }

  if (
    total.totalACV !== insuranceScope.totalAcv &&
    insuranceScope.totalAcv !==
      roundFloat(insuranceScope.totalRcv - insuranceScope.deductible, 2)
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'totalAcvValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'totalAcvValidate',
  });
}

async function netClaimSumValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const expectedNetClaimSum = roundFloat(
    insuranceScope.totalRcv -
      insuranceScope.deductible -
      insuranceScope.totalDepreciation,
    2
  );
  if (insuranceScope.netClaimSum !== expectedNetClaimSum) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'netClaimSumValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'netClaimSumValidate',
  });
}

async function totalRecoverableDeprecationSumValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  if (
    !isNumber(insuranceScope.totalRecoverableDepreciationSum, {
      maxDecimalPlaces: 2,
    }) ||
    insuranceScope.totalRecoverableDepreciationSum < 0
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'totalRecoverableDeprecationSumValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'totalRecoverableDeprecationSumValidate',
  });
}

async function totalNonRecoverableDeprecationSumValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  if (
    !isNumber(insuranceScope.totalNonRecoverableDepreciationSum, {
      maxDecimalPlaces: 2,
    }) ||
    insuranceScope.totalNonRecoverableDepreciationSum < 0
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0060',
      type: InsuranceScopeValidationType.error,
      property: 'totalNonRecoverableDeprecationSumValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'totalNonRecoverableDeprecationSumValidate',
  });
}

async function netClaimIfDeprecationIsRecoveredValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const expectedNetClaimIfDepreciationIsRecovered = roundFloat(
    insuranceScope.totalRcv - insuranceScope.deductible,
    2
  );
  if (
    insuranceScope.netClaimIfDepreciationIsRecovered !==
    expectedNetClaimIfDepreciationIsRecovered
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0074',
      type: InsuranceScopeValidationType.error,
      property: 'netClaimIfDeprecationIsRecoveredValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'netClaimIfDeprecationIsRecoveredValidate',
  });
}
