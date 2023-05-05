import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as jobService from '@squaredash/job';
import * as jobContractsService from '@squaredash/job-contract';
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

  await jobService.validateAndGetJob(jobId, context.user);

  const jobContracts = await jobContractsService.getByJobId(jobId);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobContracts),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_contract_list', lambda))
);
