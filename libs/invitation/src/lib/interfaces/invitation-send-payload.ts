import { TShirtSize } from '@squaredash/shared/interfaces';

import { SendInvitationAdressPayload } from './invitation-send-address-payload';

export interface InvitationSendPayload {
  email: string;
  name: string;
  role: 'COMPANY_USER' | 'COMPANY_ADMIN' | 'SUPER_ADMIN' | 'COMPANY_OWNER';
  phone?: string;
  address?: SendInvitationAdressPayload;
  birthDate?: string;
  tShirtSize?: TShirtSize;
  timezone?: string;
  avatarId?: string;
}
