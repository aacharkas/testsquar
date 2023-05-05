import { Prisma } from '@prisma/client';

import { UpdateAddressPayload } from '@squaredash/address';

// TODO: deal with UpdateAddressPayload. create shared AddressPayload without id field / or implement any other idea
// TODO: that will solve the problem of duplicates and redundant Omit
export type CompanyLocationUpdate = Prisma.CompanyLocationUpdateInput & {
  address?: Omit<UpdateAddressPayload, 'id'>;
};
