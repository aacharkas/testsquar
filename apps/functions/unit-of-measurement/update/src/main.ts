import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as unitOfMeasurementService from '@squaredash/crud/unit-of-measurement';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { UpdateUnitOfMeasurementBody } from './models/update-unit-of-measurement-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const body = (await transformAndValidate<UpdateUnitOfMeasurementBody>(
    UpdateUnitOfMeasurementBody,
    parsedBody
  )) as UpdateUnitOfMeasurementBody;

  const unitOfMeasurement = await unitOfMeasurementService.update({ id }, body);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(unitOfMeasurement),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('unit_of_measurement_update', lambda)
  )
);
