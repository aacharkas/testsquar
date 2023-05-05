import { redisClient } from '@squaredash/shared/redis';

import { getKey } from './get-key';

export async function subscribe(channelName: string, connectionId: string) {
  return redisClient.sadd(getKey(channelName), connectionId);
}
