import { postToConnection } from '../connection/post-to-connection';
import { PostToChannelPayload } from '../models/post-to-channel-payload';
import { TriggerableEvent } from '../types';
import { getChannelListenersByName } from './get-channel-listeners-by-name';

export async function postToChannel<E extends TriggerableEvent>({
  channel: channelName,
  event,
  data,
}: PostToChannelPayload<E>) {
  const listeners = await getChannelListenersByName(channelName);
  console.log(listeners);

  await Promise.all(
    listeners.map((connectionId) =>
      postToConnection(connectionId, { event, data })
    )
  );
}
