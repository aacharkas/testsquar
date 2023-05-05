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

import { CreateCustomerBody } from './models/create-customer-body';

const create = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const isUserSuperAdmin = !context.user.companyId;
  const isCompanyUser = context.user.role === USER_ROLE.COMPANY_USER;

  const body = (await transformAndValidate<CreateCustomerBody>(
    CreateCustomerBody,
    { ...parsedBody, isCompanyUser, isUserSuperAdmin }
  )) as CreateCustomerBody;

  // TODO: delete isUserAdmin/isUserSuperAdmin from destructuring assigment after class-transformer works
  const {
    parentId,
    responsibleMemberIds,
    companyId,
    isCompanyUser: _temporaryHere,
    isUserSuperAdmin: _alsoTemporaryHere,
    ...data
  } = body;
  const customer = await customerService.create({
    ...data,
    parent: parentId,
    company: isUserSuperAdmin ? companyId : context.user.companyId,
    responsibleMembers: !isCompanyUser
      ? responsibleMemberIds
      : [context.user.id],
  });

  return {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(customer),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('customer_create', create))
);
