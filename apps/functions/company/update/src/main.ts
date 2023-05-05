import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as companyService from '@squaredash/company';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { UpdateCompanyBody } from './models/update-company-body';

const update = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);

  const body = (await transformAndValidate(UpdateCompanyBody, parsedBody, {
    validator: {
      whitelist: true,
    },
  })) as UpdateCompanyBody;

  await companyService.update(
    context.user.companyId || event.pathParameters.id,
    body
  );
  const company = await companyService.getByIdWithMeta(event.pathParameters.id);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...company, ...body }),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('company_update', update))
);
