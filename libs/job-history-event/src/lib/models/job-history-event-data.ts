// TODO: change objects to actual types
import { JobHistoryEventType } from './job-history-event-type.enum';
import { StatusUpdatePayload } from './status-update-payload';

export type JobHistoryEventData = {
  [JobHistoryEventType.STATUS_UPDATED]: StatusUpdatePayload;
  [JobHistoryEventType.COC_CREATED]: object;
  [JobHistoryEventType.ROUF_CREATED]: object;
  [JobHistoryEventType.PAYMENT_SCHEDULE_SENT]: object;
  [JobHistoryEventType.PAYMENT_REMINDER_SENT]: object;
  [JobHistoryEventType.COC_SENT]: object;
  [JobHistoryEventType.ROUF_SENT]: object;
};
