import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as companyService from '@squaredash/company';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { ListCompanyQuery } from './models/list-company-query';

const list = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    ListCompanyQuery,
    event.queryStringParameters
  )) as ListCompanyQuery;
  const result = await companyService.list(query);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('company_list_get', list))
);
