import { redisClient } from '@squaredash/shared/redis';

import { findConnection } from '../connection/find';
import { getKey } from './get-key';

export async function getChannelListenersByName(channelName: string) {
  const listeners = await redisClient.smembers(getKey(channelName));
  await pruneListeners(channelName, listeners);

  return redisClient.smembers(getKey(channelName));
}

async function pruneListeners(channelName: string, listeners: string[]) {
  return Promise.all(
    listeners.map(async (listener) => {
      if (!(await findConnection(listener))) {
        await redisClient.srem(getKey(channelName), listener);
      }
    })
  );
}
