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

import { UpdateLocationBody } from './models/update-location-body';

const updateLocation = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const isUserSuperAdmin = !context.user.companyId;

  const body = (await transformAndValidate(
    UpdateLocationBody,
    { ...parsedBody, isUserSuperAdmin },
    {
      validator: {
        whitelist: true,
      },
    }
  )) as UpdateLocationBody;

  const { companyId, isUserSuperAdmin: _temporaryHere, ...data } = body;
  const response = await companyService.updateLocation(
    event.pathParameters.id,
    isUserSuperAdmin ? companyId : context.user.companyId,
    data
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('company_location_update', updateLocation)
  )
);
