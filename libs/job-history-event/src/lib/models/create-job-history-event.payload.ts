import { JobHistoryEventData } from './job-history-event-data';
import { JobHistoryEventType } from './job-history-event-type.enum';

export type CreateJobHistoryEventPayload<T extends JobHistoryEventType> = {
  userId: string;
  versionId: string;
  eventType: T;
  jobId: string;
} & GetData<T>;

type GetData<T extends JobHistoryEventType> =
  T extends keyof JobHistoryEventData ? { data: JobHistoryEventData[T] } : {};
