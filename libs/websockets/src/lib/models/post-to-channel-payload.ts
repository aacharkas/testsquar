import { TriggerableEvent } from '../types';
import { EventData } from '../types/event-data';

export interface PostToChannelPayload<E extends TriggerableEvent> {
  channel: string;
  event: E;
  data: EventData<E>;
}
