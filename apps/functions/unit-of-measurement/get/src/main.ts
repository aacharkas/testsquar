import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as unitOfMeasurementService from '@squaredash/crud/unit-of-measurement';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const unitOfMeasurement = await unitOfMeasurementService.find({ id });

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(unitOfMeasurement),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('unit_of_measurement_get', lambda))
);
