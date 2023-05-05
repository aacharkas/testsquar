import moment from 'moment/moment';

import { InsuranceScopeWithMeta } from '@squaredash/crud/insurance-scope';
import { InsuranceScopeValidationType } from '@squaredash/shared/models';
import { ValidationNotification } from '@squaredash/shared/models';

import { sendNotificationToChannel } from '../utils';

export async function generalInformationValidate(
  insuranceScope: InsuranceScopeWithMeta
) {
  return Promise.all([
    typeOfLossValidate(insuranceScope),
    dateOfLossFormatValidate(insuranceScope),
    dateOfLossValueValidate(insuranceScope),
    policyNumberValidate(insuranceScope),
    priceListValidate(insuranceScope),
  ]);
}

async function typeOfLossValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const maxLength = 50;
  if (
    typeof insuranceScope.typeOfLoss !== 'string' ||
    insuranceScope.typeOfLoss.length > maxLength
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'typeOfLossValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'typeOfLossValidate',
  });
}

async function dateOfLossFormatValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const validDateFormat = 'MM/DD/YYYY';
  const date = moment(insuranceScope.dateOfLoss, validDateFormat, true);
  if (!date.isValid()) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0061',
      type: InsuranceScopeValidationType.error,
      property: 'dateOfLossFormatValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'dateOfLossFormatValidate',
  });
}

async function dateOfLossValueValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const date = moment(insuranceScope.dateOfLoss);
  if (date.isAfter(moment())) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0062',
      type: InsuranceScopeValidationType.error,
      property: 'dateOfLossValueValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'dateOfLossValueValidate',
  });
}

async function policyNumberValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const maxLength = 50;
  if (
    typeof insuranceScope.policyNumber !== 'string' ||
    insuranceScope.policyNumber.length > maxLength
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'policyNumberValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'policyNumberValidate',
  });
}

async function priceListValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  const maxLength = 50;
  if (
    typeof insuranceScope.priceList !== 'string' ||
    insuranceScope.priceList.length > maxLength
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'priceListValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'priceListValidate',
  });
}
