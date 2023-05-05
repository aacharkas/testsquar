import { PrismaClient } from '@prisma/client';

import { Config } from '@squaredash/shared/util';

const config = Config.DATABASE;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.url,
    },
  },
});
