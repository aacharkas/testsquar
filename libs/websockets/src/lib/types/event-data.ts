import { TriggerableEvent } from './triggerable-event';

type EventDataTypes = {
  [TriggerableEvent.PROGRESS_UPDATED]: {
    progress: number;
  };
  [TriggerableEvent.INSURANCE_SCOPE_SELF_VALIDATION]: {
    notification: object;
  };
  [TriggerableEvent.INSURANCE_SCOPE_ALGORITHM_VALIDATION]: {
    notification: object;
  };
};

export type EventData<K extends keyof EventDataTypes> = EventDataTypes[K];
