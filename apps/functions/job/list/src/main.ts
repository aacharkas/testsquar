import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as jobService from '@squaredash/crud/job';
import { USER_ROLE } from '@squaredash/shared/constants';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException, HTTP_STATUS } from '@squaredash/shared/util';

import { getCompanyIds } from './app/helpers/get-company-ids';
import { JobListQuery } from './app/models/job-list-query';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    JobListQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as JobListQuery;

  if (query.companyIds?.length && !context.user.companyId) {
    throw new BadRequestException('User not able to filter by companyIds');
  }

  const searchParams = {
    take: query.take || DEFAULT_TAKE,
    skip: query.skip || DEFAULT_SKIP,
    search: query.search,
    responsibleUserId:
      context.user.role === USER_ROLE.COMPANY_USER
        ? context.user.id
        : undefined,
    filter: {
      companyIds: getCompanyIds(context, query),
      insuranceCarrierIds: query.insuranceCarrierIds?.length
        ? query.insuranceCarrierIds
        : undefined,
      customerIds: query.customerIds?.length ? query.customerIds : undefined,
      status: query.statuses || undefined,
      dateOfLossFrom: query.dateOfLossFrom || undefined,
      dateOfLossTo: query.dateOfLossTo || undefined,
      createdFrom: query.createdFrom || undefined,
      createdTo: query.createdTo || undefined,
      loanFrom: query.loanFrom || undefined,
      loanTo: query.loanTo || undefined,
      dueBalanceFrom: query.dueBalanceFrom || undefined,
      dueBalanceTo: query.dueBalanceTo || undefined,
    },
  };

  const response = await jobService.findMany(searchParams);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('job_list', lambda))
);
