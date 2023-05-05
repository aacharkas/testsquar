import { Address } from './address';

export type UpdateAddressPayload = Omit<Address, 'techStatus' | 'createdAt'>;
