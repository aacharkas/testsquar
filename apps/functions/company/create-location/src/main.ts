import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as companyService from '@squaredash/company';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { CreateLocationBody } from './models/create-location-body';

const createLocation = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const isUserSuperAdmin = !context.user.companyId;

  const body = (await transformAndValidate<CreateLocationBody>(
    CreateLocationBody,
    { ...parsedBody, isUserSuperAdmin },
    {
      validator: {
        whitelist: true,
      },
    }
  )) as CreateLocationBody;

  const { companyId, isUserSuperAdmin: _temporaryHere, ...data } = body;
  const location = await companyService.createLocation({
    ...data,
    company: isUserSuperAdmin ? companyId : context.user.companyId,
  });

  return {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(location),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('company_location_create', createLocation)
  )
);
