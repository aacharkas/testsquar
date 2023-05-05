import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as jobsService from '@squaredash/job';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { UpdateJobLineItemBody } from './models/update-job-line-item.body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const jobId = event.pathParameters.id;

  await jobsService.validateAndGetJob(jobId, context.user);

  const updateLineItemsPayload = (await transformAndValidate(
    UpdateJobLineItemBody,
    event.body
  )) as UpdateJobLineItemBody[];

  const job = await jobsService.updateLineItems(
    jobId,
    updateLineItemsPayload,
    context.user.id
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_update', lambda))
);
