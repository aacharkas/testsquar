import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as authService from '@squaredash/auth';
import * as userCrud from '@squaredash/crud/user';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
} from '@squaredash/shared/middlewares';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const user = await userCrud.find({ where: { id: context.user.id } });

  await authService.resendConfirmationEmail(user);

  return {
    statusCode: 201,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(authGuard(lambda));
