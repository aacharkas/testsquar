import { Address } from '@prisma/client';

import { User } from '@squaredash/shared/constants';

export interface UserWithAddress extends User {
  address: Address | null;
  avatar: string | null;
}
