import { InsuranceScopeStatus } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { InsuranceScopeListQuery } from './models/insurance-scope-list-query';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    InsuranceScopeListQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as InsuranceScopeListQuery;

  const searchParams = {
    take: query.take,
    skip: query.skip,
    search: query.search,
    responsibleUserId:
      context.user.role === USER_ROLE.COMPANY_USER
        ? context.user.id
        : undefined,
    status:
      context.user.role === USER_ROLE.SUPER_ADMIN
        ? InsuranceScopeStatus.IMPORTED
        : undefined,
    filter: {
      insuranceCarrierIds: query.insuranceCarrierIds?.length
        ? query.insuranceCarrierIds
        : undefined,
      customerIds: query.customerIds?.length ? query.customerIds : undefined,
      dateOfLossFrom: query.dateOfLossFrom || undefined,
      dateOfLossTo: query.dateOfLossTo || undefined,
      rcvFrom: query.rcvFrom || undefined,
      rcvTo: query.rcvTo || undefined,
      createdAtFrom: query.createdAtFrom || undefined,
      createdAtTo: query.createdAtTo || undefined,
      companyIds: query.companyIds || undefined,
      status: query.status || undefined,
    },
  };

  if (context.user.role !== USER_ROLE.SUPER_ADMIN) {
    searchParams.filter.companyIds = [context.user.companyId];
  }

  const response = await insuranceScopeService.findMany(searchParams);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('insurance_scope_list', lambda))
);
