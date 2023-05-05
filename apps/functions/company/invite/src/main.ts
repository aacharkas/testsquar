import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { invite } from '@squaredash/company';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { inviteCompanyBodyToInviteCompanyPayload } from './mappers/invite-company-body-to-invite-company-payload';
import { InviteCompanyBody } from './models/invite-company-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);

  const body = (await transformAndValidate<InviteCompanyBody>(
    InviteCompanyBody,
    parsedBody
  )) as InviteCompanyBody;

  const invitePayload = inviteCompanyBodyToInviteCompanyPayload(body);
  const createdCompany = await invite(context.user.id, invitePayload);

  return {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(createdCompany),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('company_invite', lambda))
);
