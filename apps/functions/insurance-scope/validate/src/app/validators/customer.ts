import { isPhoneNumber } from 'class-validator';

import { InsuranceScopeWithMeta } from '@squaredash/crud/insurance-scope';
import * as customerService from '@squaredash/customer';
import { Customer } from '@squaredash/customer';
import { InsuranceScopeValidationType } from '@squaredash/shared/models';
import { ValidationNotification } from '@squaredash/shared/models';

import { sendNotificationToChannel } from '../utils';

export async function customerValidate(insuranceScope: InsuranceScopeWithMeta) {
  const customer = await customerService.findByDisplayName(
    insuranceScope.customer.displayName
  );

  return Promise.all([
    customerDisplayNameValidate(insuranceScope, customer),
    customerNameValidate(insuranceScope, customer),
    customerEmailValidate(insuranceScope, customer),
    customerPhoneNumberValidate(insuranceScope, customer),
    customerPropertyAddressValidate(insuranceScope),
    customerShippingAddressValidate(insuranceScope, customer),
  ]);
}

async function customerDisplayNameValidate(
  insuranceScope: InsuranceScopeWithMeta,
  customer?: Customer
): Promise<ValidationNotification> {
  if (customer || insuranceScope.customer.customerId) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'customerDisplayNameValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'IM0063',
    type: InsuranceScopeValidationType.warning,
    property: 'customerDisplayNameValidate',
  });
}

async function customerNameValidate(
  insuranceScope: InsuranceScopeWithMeta,
  customer: Customer
): Promise<ValidationNotification> {
  if (!customer) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'customerNameValidate',
    });
  }

  if (!insuranceScope.customer.firstName || !insuranceScope.customer.lastName) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0064',
      type: InsuranceScopeValidationType.warning,
      property: 'customerNameValidate',
    });
  }

  if (
    !customer.displayName.includes(insuranceScope.customer.firstName) ||
    !customer.displayName.includes(insuranceScope.customer.lastName)
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0064',
      type: InsuranceScopeValidationType.warning,
      property: 'customerNameValidate',
    });
  } else {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0070',
      type: InsuranceScopeValidationType.warning,
      property: 'customerNameValidate',
    });
  }
}

async function customerEmailValidate(
  insuranceScope: InsuranceScopeWithMeta,
  customer: Customer
): Promise<ValidationNotification> {
  if (!customer) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'customerEmailValidate',
    });
  }

  if (!insuranceScope.customer.email) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0064',
      type: InsuranceScopeValidationType.warning,
      property: 'customerEmailValidate',
    });
  }

  if (insuranceScope.customer.email !== customer.email) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0070',
      type: InsuranceScopeValidationType.warning,
      property: 'customerEmailValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'customerEmailValidate',
  });
}

async function customerPhoneNumberValidate(
  insuranceScope: InsuranceScopeWithMeta,
  customer: Customer
): Promise<ValidationNotification> {
  if (!customer) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'customerPhoneNumberValidate',
    });
  }

  if (!insuranceScope.customer.phone) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0064',
      type: InsuranceScopeValidationType.warning,
      property: 'customerPhoneNumberValidate',
    });
  }

  if (!isPhoneNumber(insuranceScope.customer.phone)) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0011',
      type: InsuranceScopeValidationType.error,
      property: 'customerPhoneNumberValidate',
    });
  }

  if (insuranceScope.customer.phone !== customer.phone) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0070',
      type: InsuranceScopeValidationType.warning,
      property: 'customerPhoneNumberValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'customerPhoneNumberValidate',
  });
}

async function customerPropertyAddressValidate(
  insuranceScope: InsuranceScopeWithMeta
): Promise<ValidationNotification> {
  if (!insuranceScope.customer.propertyAddress) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0001',
      type: InsuranceScopeValidationType.error,
      property: 'customerPropertyAddressValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'customerPropertyAddressValidate',
  });
}

async function customerShippingAddressValidate(
  insuranceScope: InsuranceScopeWithMeta,
  customer: Customer
): Promise<ValidationNotification> {
  if (!customer) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'success',
      type: InsuranceScopeValidationType.log,
      property: 'customerShippingAddressValidate',
    });
  }

  if (!insuranceScope.customer.shippingAddress) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0064',
      type: InsuranceScopeValidationType.warning,
      property: 'customerShippingAddressValidate',
    });
  }

  if (
    insuranceScope.customer.shippingAddress !==
    customer.shippingAddress.formattedAddress
  ) {
    return sendNotificationToChannel(insuranceScope.id, {
      id: insuranceScope.id,
      code: 'IM0070',
      type: InsuranceScopeValidationType.error,
      property: 'customerShippingAddressValidate',
    });
  }

  return sendNotificationToChannel(insuranceScope.id, {
    id: insuranceScope.id,
    code: 'success',
    type: InsuranceScopeValidationType.log,
    property: 'customerShippingAddressValidate',
  });
}
