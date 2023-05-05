import { JobStatus } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { JobWithMeta } from '@squaredash/job';
import * as jobsService from '@squaredash/job';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { jobWithMetaToResponseJob } from './mappers/job-with-meta-to-response-job';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const jobId = event.pathParameters.id;
  const job = await jobsService.validateAndGetJob(jobId, context.user);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await mapJobToResponse(job)),
  };
};

async function mapJobToResponse(job: JobWithMeta) {
  const mapped = jobWithMetaToResponseJob(job);

  if (job.status !== JobStatus.UPDATE_REQUIRED) {
    return mapped;
  }

  const pendingVersion = await jobsService.findPendingVersion(job.versionId);

  return {
    ...mapped,
    pendingVersion: {
      changes: jobsService.getLineItemsDifference(job, pendingVersion),
      job: pendingVersion,
    },
  };
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_get', lambda))
);
