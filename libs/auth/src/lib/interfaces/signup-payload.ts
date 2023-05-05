import { CreateAddressPayload } from '@squaredash/address';
import { TShirtSize } from '@squaredash/shared/interfaces';

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: CreateAddressPayload;
  birthDate?: string;
  tShirtSize?: TShirtSize;
  timezone?: string;
  invitationToken?: string;
}
