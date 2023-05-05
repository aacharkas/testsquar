import { JobStatus } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as jobsService from '@squaredash/job';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const jobId = event.pathParameters.id;

  await jobsService.validateAndGetJob(jobId, context.user);

  const job = await jobsService.submitJob(jobId);
  const updatedJob = await jobsService.updateStatus(
    job.versionId,
    context.user.id,
    JobStatus.UPDATED
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedJob),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_version_submit', lambda))
);
