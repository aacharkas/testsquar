import { APIGatewayProxyResult } from 'aws-lambda';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { validateAccuracyResults } from './app';

const lambda = async (): Promise<APIGatewayProxyResult> => {
  const data = await validateAccuracyResults();

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('algorithm_accuracy_check', lambda)
  )
);
