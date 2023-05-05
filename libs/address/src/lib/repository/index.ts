import { Prisma, PrismaClient } from '@prisma/client';

import { CreateAddressPayload } from '@squaredash/address';
import { UpdateAddressPayload } from '@squaredash/address';
import { prisma } from '@squaredash/shared/db';

import { Address } from '../models/address';

export async function create(payload: CreateAddressPayload): Promise<Address> {
  return prisma.address.create({ data: payload });
}

export async function update(payload: UpdateAddressPayload): Promise<Address> {
  const { id: addressId, ...data } = payload;
  return prisma.address.update({ data: data, where: { id: addressId } });
}

export async function findUnique(args: Prisma.AddressFindUniqueArgs) {
  return prisma.address.findUnique(args);
}

export async function upsert(
  args: Prisma.AddressUpsertArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.address.upsert(args);
}
