import { UpdateAddressPayload } from '@squaredash/address';

export interface CreateInsuranceCarrierPayload {
  name: string;
  email?: string;
  phone?: string;
  fax?: string;
  address?: Omit<UpdateAddressPayload, 'id'>;
}
