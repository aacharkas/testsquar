import { pick } from '@squaredash/shared/util';

import {
  Customer,
  CustomerModel,
  CustomerModelWithMeta,
  CustomerWithMeta,
} from '../models';
import { PopulatedCustomer } from '../models/populated-customer';

export const customerModelWithMetaToCustomerWithMeta = (
  model: CustomerModelWithMeta
): CustomerWithMeta => {
  return {
    ...model,
    parent: model.parent
      ? pick(model.parent, ['id', 'displayName'])
      : undefined,
    subCustomers: model.subCustomers.map((item) =>
      pick(item, ['id', 'displayName'])
    ),
    responsibleMembers: model.responsibleMembers.map((item) =>
      pick(item.user, ['id', 'name'])
    ),
  };
};

export const customerModelToCustomer = (model: CustomerModel): Customer => {
  return {
    ...pick(model, [
      'id',
      'displayName',
      'email',
      'phone',
      'billingName',
      'billingAddressId',
      'billingAddress',
      'shippingAddress',
      'shippingAddressId',
      'parentId',
      'createdAt',
      'updatedAt',
    ]),
    responsibleMembers: model.responsibleMembers.map((item) =>
      pick(item.user, ['id', 'name'])
    ),
  };
};

export const populatedCustomerToCustomer = (
  customer: PopulatedCustomer
): Customer => ({
  id: customer.customer_id,
  displayName: customer.customer_displayName,
  email: customer.customer_email,
  phone: customer.customer_phone,
  billingName: customer.customer_billingName,
  billingAddressId: customer.customer_billingAddressId,
  shippingAddressId: customer.customer_shippingAddress_id,
  parentId: customer.customer_parentId,
  createdAt: customer.customer_createdAt,
  updatedAt: customer.customer_updatedAt,
  billingAddress: {
    id: customer.billingAddress_id,
    placeId: customer.billingAddress_placeId,
    country: customer.billingAddress_country,
    state: customer.billingAddress_state,
    city: customer.billingAddress_city,
    zipCode: customer.billingAddress_zipCode,
    streetAddress1: customer.billingAddress_streetAddress1,
    streetAddress2: customer.billingAddress_streetAddress2,
    apartment: customer.billingAddress_apartment,
    formattedAddress: customer.billingAddress_formattedAddress,
    latitude: customer.billingAddress_latitude,
    longitude: customer.billingAddress_longitude,
    createdAt: customer.billingAddress_createdAt,
    techStatus: customer.billingAddress_techStatus,
  },
  shippingAddress: {
    id: customer.shippingAddress_id,
    placeId: customer.shippingAddress_placeId,
    country: customer.shippingAddress_country,
    state: customer.shippingAddress_state,
    city: customer.shippingAddress_city,
    zipCode: customer.shippingAddress_zipCode,
    streetAddress1: customer.shippingAddress_streetAddress1,
    streetAddress2: customer.shippingAddress_streetAddress2,
    apartment: customer.shippingAddress_apartment,
    formattedAddress: customer.shippingAddress_formattedAddress,
    latitude: customer.shippingAddress_latitude,
    longitude: customer.shippingAddress_longitude,
    createdAt: customer.shippingAddress_createdAt,
    techStatus: customer.shippingAddress_techStatus,
  },
  responsibleMembers: customer.responsibleMembers,
});
