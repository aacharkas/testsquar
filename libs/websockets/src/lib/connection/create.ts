import { redisClient } from '@squaredash/shared/redis';
import { Config } from '@squaredash/shared/util';

import { getKey } from './get-key';

export async function createConnection(connectionId: string) {
  return redisClient.set(
    getKey(connectionId),
    connectionId,
    'EX',
    Config.WEBSOCKETS.connectionTtl
  );
}
