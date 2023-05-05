import { Prisma, PrismaClient } from '@prisma/client';

import { CreateAddressPayload } from './models';
import { Address } from './models';
import { UpdateAddressPayload } from './models';
import * as repository from './repository';

export function create(payload: CreateAddressPayload): Promise<Address> {
  return repository.create(payload);
}

export function update(payload: UpdateAddressPayload): Promise<Address> {
  return repository.update(payload);
}

export async function findOrCreate(
  where: Prisma.AddressWhereUniqueInput,
  payload: Prisma.AddressCreateInput,
  tx?: PrismaClient
) {
  return repository.upsert(
    {
      where,
      update: {},
      create: payload,
    },
    tx
  );
}
