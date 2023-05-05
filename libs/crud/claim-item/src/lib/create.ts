import { Prisma } from '@prisma/client';

import { handleUniqueConstraintError } from './helpers/handle-unique-constraint-error';
import * as claimItemRepository from './repository';

export async function create(data: Prisma.ClaimItemCreateInput) {
  try {
    return await claimItemRepository.create(data);
  } catch (e) {
    handleUniqueConstraintError(e);
  }
}
