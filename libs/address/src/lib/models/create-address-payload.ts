import { Address } from './address';

export type CreateAddressPayload = Omit<
  Address,
  'id' | 'techStatus' | 'createdAt'
>;
