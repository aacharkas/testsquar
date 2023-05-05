import {
  APIGatewayProxyResult,
  APIGatewayProxyWebsocketEventV2,
} from 'aws-lambda';

import * as wsService from '@squaredash/websockets';

const lambda = async (
  event: APIGatewayProxyWebsocketEventV2
): Promise<APIGatewayProxyResult> => {
  const connectionId = event.requestContext.connectionId;

  await wsService.createConnection(connectionId);

  return {
    statusCode: 204,
    body: null,
  };
};

exports.handler = lambda;
