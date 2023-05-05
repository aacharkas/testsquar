import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as jobContractCrud from '@squaredash/crud/job-contract';
import * as jobService from '@squaredash/job';
import * as jobContractService from '@squaredash/job-contract';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException } from '@squaredash/shared/util';

import { JobContractCreateBody } from './models/job-contract-create.body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const { job, body } = await validateEvent(event, context);

  const createdContract = await jobContractCrud.create({
    data: {
      ...body,
      jobId: job.id,
    },
  });

  const jobContract = await jobContractService.getById(createdContract.id);

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobContract),
  };
};

async function validateEvent(event: APIGatewayEvent, context: CustomContext) {
  const jobId = event.pathParameters.id;

  const job = await jobService.validateAndGetJob(jobId, context.user);

  if (job.contracts.length >= 6) {
    throw new BadRequestException('IM0089');
  }

  const body = (await transformAndValidate(JobContractCreateBody, event.body, {
    validator: {
      whitelist: true,
    },
  })) as JobContractCreateBody;

  return { job, body };
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_contract_create', lambda))
);
