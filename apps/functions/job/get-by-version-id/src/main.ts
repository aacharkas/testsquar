import { JobStatus } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as jobsService from '@squaredash/job';
import { JobWithMeta } from '@squaredash/job';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { NotFoundException } from '@squaredash/shared/util';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const versionId = event.pathParameters.id;

  const job = await jobsService.findLatestSubmittedJobVersion(versionId);
  if (!job) {
    throw new NotFoundException('IM0053');
  }

  await jobsService.validateAndGetJob(job.id, context.user);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await mapJobToResponse(job)),
  };
};

async function mapJobToResponse(job: JobWithMeta) {
  if (job.status !== JobStatus.UPDATE_REQUIRED) {
    return job;
  }

  const pendingVersion = await jobsService.findPendingVersion(job.versionId);

  return {
    ...job,
    pendingVersion: {
      changes: jobsService.getLineItemsDifference(job, pendingVersion),
      job: pendingVersion,
    },
  };
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_get', lambda))
);
