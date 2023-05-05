import { CustomerType } from '@squaredash/customer';

import { CreateAddressInformation } from './create-address-information';

export class SaveCustomerDetails {
  type: CustomerType;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  responsibleMemberId: string;
  company: string;
  billingInformation: CreateAddressInformation;
  shippingInformation: CreateAddressInformation;
}
