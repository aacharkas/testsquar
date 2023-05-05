import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as companyService from '@squaredash/company';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const getLocation = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const company = await companyService.getLocationById(event.pathParameters.id);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(company),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('company_location_get', getLocation)
  )
);
