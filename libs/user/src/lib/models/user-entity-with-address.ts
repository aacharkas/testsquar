import { Address, User } from '@prisma/client';

export interface UserEntityWithAddress extends User {
  Address: Address | null;
}
