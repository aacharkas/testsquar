import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as unitOfMeasurementService from '@squaredash/crud/unit-of-measurement';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { CreateUnitOfMeasurementBody } from './models/create-unit-of-measurement-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);

  const body = (await transformAndValidate<CreateUnitOfMeasurementBody>(
    CreateUnitOfMeasurementBody,
    parsedBody
  )) as CreateUnitOfMeasurementBody;

  const unitOfMeasurement = await unitOfMeasurementService.create(body);

  return {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(unitOfMeasurement),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('unit_of_measurement_create', lambda)
  )
);
