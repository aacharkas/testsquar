import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as customerService from '@squaredash/customer';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { UpdateCustomerBody } from './models/update-customer-body';

const update = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const isUserSuperAdmin = !context.user.companyId;
  const isCompanyUser = context.user.role === USER_ROLE.COMPANY_USER;

  const body = (await transformAndValidate<UpdateCustomerBody>(
    UpdateCustomerBody,
    { ...parsedBody, isCompanyUser, isUserSuperAdmin }
  )) as UpdateCustomerBody;

  // TODO: delete isUserAdmin from destructuring assigment after class-transformer works
  const {
    parentId,
    responsibleMemberIds,
    companyId,
    isCompanyUser: _temporaryHere,
    isUserSuperAdmin: _alsoTemporaryHere,
    ...data
  } = body;
  const customer = await customerService.update(
    event.pathParameters.id,
    context.user.id,
    companyId,
    isCompanyUser,
    {
      ...data,
      parent: parentId,
      responsibleMembers: !isCompanyUser ? responsibleMemberIds : undefined,
    }
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(customer),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('customer_update', update))
);
