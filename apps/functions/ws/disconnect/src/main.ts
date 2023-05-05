import {
  APIGatewayProxyResult,
  APIGatewayProxyWebsocketEventV2,
} from 'aws-lambda';

import * as wsService from '@squaredash/websockets';

export const lambda = async (
  event: APIGatewayProxyWebsocketEventV2
): Promise<APIGatewayProxyResult> => {
  const connectionId = event.requestContext.connectionId;

  await wsService.deleteConnectionById(connectionId);

  return {
    statusCode: 204,
    body: null,
  };
};

exports.handler = lambda;
