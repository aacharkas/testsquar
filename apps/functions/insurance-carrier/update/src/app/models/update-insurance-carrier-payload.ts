import { UpdateAddressPayload } from '@squaredash/address';

export interface UpdateInsuranceCarrierPayload {
  name?: string;
  email?: string;
  phone?: string;
  fax?: string;
  address?: Omit<UpdateAddressPayload, 'id'>;
}
