import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { AuthTokens, generateTokens } from '@squaredash/auth';
import * as companyService from '@squaredash/company';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS, generateSetCookiesHeader } from '@squaredash/shared/util';
import * as usersService from '@squaredash/user';

import { signOut } from '../../../auth/sign-out/src/app/sign-out';
import { CreateCompanyBody } from './models/create-company-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);

  const body = (await transformAndValidate<CreateCompanyBody>(
    CreateCompanyBody,
    parsedBody
  )) as CreateCompanyBody;

  const company = await companyService.create(context.user.id, {
    ...body,
    legalName: body.legalName || body.name,
  });

  const response: APIGatewayProxyResult = {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(company),
  };

  if (context.user.role === USER_ROLE.COMPANY_OWNER) {
    const { tokens, setCookiesHeader } = await generateNewTokens(
      event,
      context.user.id
    );

    response.multiValueHeaders = {
      'Set-Cookie': setCookiesHeader,
    };

    response.body = JSON.stringify({ ...company, tokens });
  }

  return response;
};

export async function generateNewTokens(
  event: APIGatewayEvent,
  userId: string
): Promise<{ tokens: AuthTokens; setCookiesHeader: string[] }> {
  const user = await usersService.getById(userId);

  await signOut(event);

  const tokens = await generateTokens(user);
  return { tokens, setCookiesHeader: generateSetCookiesHeader(tokens) };
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('company_create', lambda))
);
