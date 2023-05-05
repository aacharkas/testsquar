import { InsuranceCarrier as InsuranceCarrierModel } from '@prisma/client';
import { isPhoneNumber } from 'class-validator';

import * as insuranceCarrierService from '@squaredash/crud/insurance-carrier';
import {
  InsuranceCarrierAdjusterInfo,
  InsuranceScopeWithMeta,
} from '@squaredash/crud/insurance-scope';
import { InsuranceScopeValidationType } from '@squaredash/shared/models';
import { ValidationNotification } from '@squaredash/shared/models';

import { sendNotificationToChannel } from '../utils';

type InsuranceCarrier = Omit<InsuranceCarrierModel, 'techStatus'>;

export async function insuranceCarrierValidate(
  insuranceScope: InsuranceScopeWithMeta
) {
  const list = await insuranceCarrierService.findMany({
    where: {
      name: {
        contains: insuranceScope.insuranceCarrier.name,
        mode: 'insensitive',
      },
    },
  });
  const [insuranceCarrier] = list.rows;
  const adjustersValidationNotifications =
    await insuranceCarrierAdjustersValidate(insuranceScope);
  return Promise.all([
    insuranceCarrierNameValidate(insuranceScope, insuranceCarrier),
    insuranceCarrierEmailValidate(insuranceScope, insuranceCarrier),
    insuranceCarrierPhoneNumberValidate(insuranceScope, insuranceCarrier),
    insuranceCarrierFaxValidate(insuranceScope, insuranceCarrier),
    insuranceCarrierAddressValidate(insuranceScope, insuranceCarrier),
    ...adjustersValidationNotifications,
  ]);
}

async function insuranceCarrierNameValidate(
  insuranceScope: InsuranceScopeWithMeta,
  insuranceCarrier?: InsuranceCarrier
): Promise<ValidationNotification> {
  if (!insuranceCarrier) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0067',
      type: InsuranceScopeValidationType.error,
      property: 'insuranceCarrierNameValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierNameValidate',
  });
}

async function insuranceCarrierEmailValidate(
  insuranceScope: InsuranceScopeWithMeta,
  insuranceCarrier?: InsuranceCarrier
): Promise<ValidationNotification> {
  if (!insuranceCarrier) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'insuranceCarrierEmailValidate',
    });
  }

  if (
    !insuranceScope.insuranceCarrier.email ||
    insuranceScope.insuranceCarrier.email !== insuranceCarrier.email
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0068',
      type: InsuranceScopeValidationType.warning,
      property: 'insuranceCarrierEmailValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierEmailValidate',
  });
}

async function insuranceCarrierPhoneNumberValidate(
  insuranceScope: InsuranceScopeWithMeta,
  insuranceCarrier?: InsuranceCarrier
): Promise<ValidationNotification> {
  if (!insuranceCarrier) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'insuranceCarrierPhoneNumberValidate',
    });
  }

  if (
    !insuranceScope.insuranceCarrier.phone ||
    insuranceScope.insuranceCarrier.phone !== insuranceCarrier.phone
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0068',
      type: InsuranceScopeValidationType.warning,
      property: 'insuranceCarrierPhoneNumberValidate',
    });
  }

  if (!isPhoneNumber('+' + insuranceScope.insuranceCarrier.phone)) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0011',
      type: InsuranceScopeValidationType.error,
      property: 'insuranceCarrierPhoneNumberValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierPhoneNumberValidate',
  });
}

async function insuranceCarrierFaxValidate(
  insuranceScope: InsuranceScopeWithMeta,
  insuranceCarrier?: InsuranceCarrier
): Promise<ValidationNotification> {
  if (!insuranceCarrier) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'insuranceCarrierFaxValidate',
    });
  }

  if (
    insuranceScope.insuranceCarrier.fax &&
    !isPhoneNumber('+' + insuranceScope.insuranceCarrier.fax)
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0011',
      type: InsuranceScopeValidationType.error,
      property: 'insuranceCarrierFaxValidate',
    });
  }

  if (
    !insuranceScope.insuranceCarrier.fax ||
    insuranceScope.insuranceCarrier.fax !== insuranceCarrier.fax
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0068',
      type: InsuranceScopeValidationType.warning,
      property: 'insuranceCarrierFaxValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierFaxValidate',
  });
}

async function insuranceCarrierAddressValidate(
  insuranceScope: InsuranceScopeWithMeta,
  insuranceCarrier?: InsuranceCarrier
): Promise<ValidationNotification> {
  if (!insuranceCarrier) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'insuranceCarrierAddressValidate',
    });
  }

  if (!insuranceScope.insuranceCarrier.address) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0068',
      type: InsuranceScopeValidationType.warning,
      property: 'insuranceCarrierAddressValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierAddressValidate',
  });
}

async function insuranceCarrierAdjustersValidate(
  insuranceScope: InsuranceScopeWithMeta
) {
  if (
    !insuranceScope.insuranceCarrier ||
    !insuranceScope.insuranceCarrier.adjusters
  ) {
    return;
  }

  const notifications = await Promise.all(
    insuranceScope.insuranceCarrier.adjusters.map((adjuster) =>
      Promise.all([
        insuranceCarrierAdjustersNameValidate(insuranceScope, adjuster),
        insuranceCarrierAdjustersPhoneValidate(insuranceScope, adjuster),
      ])
    )
  );
  return notifications.flat();
}

async function insuranceCarrierAdjustersNameValidate(
  insuranceScope: InsuranceScopeWithMeta,
  adjuster: InsuranceCarrierAdjusterInfo
): Promise<ValidationNotification> {
  const maxLength = 200;
  if (typeof adjuster.name !== 'string' || adjuster.name.length > maxLength) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: adjuster.id,
      code: 'IM0059',
      type: InsuranceScopeValidationType.warning,
      property: 'insuranceCarrierAdjustersNameValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierAdjustersNameValidate',
  });
}

async function insuranceCarrierAdjustersPhoneValidate(
  insuranceScope: InsuranceScopeWithMeta,
  adjuster: InsuranceCarrierAdjusterInfo
): Promise<ValidationNotification> {
  if (!adjuster.phone) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: adjuster.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'insuranceCarrierAdjustersPhoneValidate',
    });
  }

  const maxLength = 15;
  if (adjuster.phone.length > maxLength || !isPhoneNumber(adjuster.phone)) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: adjuster.id,
      code: 'IM0011',
      type: InsuranceScopeValidationType.error,
      property: 'insuranceCarrierAdjustersPhoneValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: adjuster.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'insuranceCarrierAdjustersPhoneValidate',
  });
}
