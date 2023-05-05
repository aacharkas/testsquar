import { UpdateAddressPayload } from '@squaredash/address';
import { USER_ROLE } from '@squaredash/shared/constants';
import { TShirtSize } from '@squaredash/shared/interfaces';

// TODO: create AddressPayload without id field. use it everywhere instead of UpdateAddressPayload/CreateAddressPayload
export interface UpdateUserPayload {
  name?: string;
  role?: USER_ROLE;
  avatarId?: string;
  phone?: string;
  birthDate?: string;
  tShirtSize?: TShirtSize;
  timezone?: string;
  address?: Omit<UpdateAddressPayload, 'id'> | null;
}
