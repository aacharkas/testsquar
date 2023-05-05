import { redisClient } from '@squaredash/shared/redis';

import { getKey } from './get-key';

export async function deleteConnectionById(connectionId: string) {
  return redisClient.del(getKey(connectionId));
}
