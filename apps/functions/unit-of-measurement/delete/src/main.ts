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

  await unitOfMeasurementService.deleteUnitOfMeasurement(id);

  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('unit_of_measurement_delete', lambda)
  )
);
