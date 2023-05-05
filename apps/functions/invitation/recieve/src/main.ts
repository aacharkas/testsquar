import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as invitationService from '@squaredash/invitation';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const recieve = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { token } = event.queryStringParameters;

  const action = await invitationService.recieve(token);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(action),
  };
};

exports.handler = errorHandlerMiddleware(recieve);
