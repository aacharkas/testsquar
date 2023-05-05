import Redis from 'ioredis';

import { Config } from '@squaredash/shared/util';

export const redisClient = new Redis({
  host: Config.REDIS.host,
  port: 6379,
  tls: {},
});
