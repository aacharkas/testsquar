import { TechStatus } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as jobContractCrud from '@squaredash/crud/job-contract';
import * as jobService from '@squaredash/job';
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
  const jobContractId = event.pathParameters.id;
  const jobContract = await jobContractCrud.findUnique({
    where: { id: jobContractId },
  });

  if (!jobContract) {
    throw new NotFoundException('IM0053');
  }

  await jobService.validateAndGetJob(jobContract.jobId, context.user);

  await jobContractCrud.update({
    where: {
      id: jobContractId,
    },
    data: {
      techStatus: TechStatus.DELETED,
    },
  });

  return {
    statusCode: 204,
    body: null,
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_contract_delete', lambda))
);
