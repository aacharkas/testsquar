const CHANNELS_NAMESPACE = 'channels';

export function getKey(channelName: string) {
  return `${CHANNELS_NAMESPACE}:${channelName}`;
}
