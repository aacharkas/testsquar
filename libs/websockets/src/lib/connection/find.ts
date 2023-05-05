import { redisClient } from '@squaredash/shared/redis';

import { getKey } from './get-key';

export async function findConnection(connectionId: string) {
  return redisClient.get(getKey(connectionId));
}
