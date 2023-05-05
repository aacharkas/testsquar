import {
  APIGatewayProxyResult,
  APIGatewayProxyWebsocketEventV2,
} from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';

import { subscribe } from './app/subscribe';
import { SubscribeToChannelBody } from './models/subscribe-to-channel.body';

const lambda = async (
  event: APIGatewayProxyWebsocketEventV2
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(
    SubscribeToChannelBody,
    event.body
  )) as SubscribeToChannelBody;

  const initialSubscriptionData = await subscribe(
    event.requestContext.connectionId,
    body.channel
  );

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: initialSubscriptionData,
      message: 'Subscribed',
    }),
  };
};

exports.handler = errorHandlerMiddleware(lambda);
