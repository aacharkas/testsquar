import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { getList } from './app/get-list';
import { EmailTemplateListQuery } from './models/email-template-list-query';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    EmailTemplateListQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as EmailTemplateListQuery;

  const list = await getList(query, context.user.companyId);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(list),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('email_template_list_get', lambda))
);
