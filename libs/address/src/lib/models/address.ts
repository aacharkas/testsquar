import { Address as AddressEntity } from '@prisma/client';

export type Address = Omit<AddressEntity, 'techStatus' | 'createdAt'>;
