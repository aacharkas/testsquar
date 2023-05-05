import { PrismaClient } from '@prisma/client';

import { CreateJobHistoryEventPayload } from './models/create-job-history-event.payload';
import { JobHistoryEventType } from './models/job-history-event-type.enum';
import * as jobHistoryEventRepository from './repository/job-history-event.repository';

export async function createJobHistoryEvent<T extends JobHistoryEventType>(
  payload: CreateJobHistoryEventPayload<T>,
  tx?: PrismaClient
) {
  return jobHistoryEventRepository.createJobHistoryEvent(
    {
      data: {
        type: payload.eventType,
        data: 'data' in payload ? JSON.stringify(payload.data) : undefined,
        versionGroup: {
          connect: {
            id: payload.versionId,
          },
        },
        createdByUser: {
          connect: {
            id: payload.userId,
          },
        },
        job: {
          connect: {
            id: payload.jobId,
          },
        },
      },
    },
    tx
  );
}
