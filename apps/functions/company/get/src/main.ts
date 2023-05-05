import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as companyService from '@squaredash/company';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { getCompanyResponseToPresentation } from './mappers/get-company-response-to-presentation';

const get = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const company = await companyService.getByIdWithMeta(
    context.user.companyId || event.pathParameters.id
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      getCompanyResponseToPresentation(context.user.role, company)
    ),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('company_get', get))
);
