const CONNECTIONS_NAMESPACE = 'connections';

export function getKey(connectionId: string) {
  return `${CONNECTIONS_NAMESPACE}:${connectionId}`;
}
