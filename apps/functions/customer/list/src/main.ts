import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { ListCustomerPayload } from '@squaredash/customer';
import * as customerService from '@squaredash/customer';
import { CUSTOMER_CATEGORY, USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { ListCustomerQuery } from './models/list-company-query';

const list = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const isUserSuperAdmin = !context.user.companyId;
  const isCompanyUser = USER_ROLE.COMPANY_USER === context.user.role;

  const query = (await transformAndValidate<ListCustomerQuery>(
    ListCustomerQuery,
    { ...event.queryStringParameters, isUserSuperAdmin }
  )) as ListCustomerQuery;

  const listPayload: ListCustomerPayload = {
    ...query,
    companyId: isUserSuperAdmin ? query.companyId : context.user.companyId,
    userId: isCompanyUser ? context.user.id : undefined,
  };

  if (query.categories) {
    const areAllCategories = Object.values(CUSTOMER_CATEGORY).every(
      (category) => query.categories.includes(category)
    );
    if (!areAllCategories) {
      listPayload.category = query.categories[0];
    }
  }

  const result = await customerService.list(listPayload);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('customer_list_get', list))
);
