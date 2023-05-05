import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as customerDraftService from '@squaredash/crud/customer-draft';
import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { UpdateInsuranceScopeCustomerBody } from './models/update-insurance-scope-customer-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.scopeId;
  await insuranceScopeService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  const parsedBody = JSON.parse(event.body);
  const { customerId, ...payload } =
    (await transformAndValidate<UpdateInsuranceScopeCustomerBody>(
      UpdateInsuranceScopeCustomerBody,
      parsedBody
    )) as UpdateInsuranceScopeCustomerBody;

  const id = event.pathParameters.id;
  const result = await customerDraftService.update(
    { id },
    {
      ...payload,
      ...(customerId
        ? {
            customer: { connect: { id: customerId } },
          }
        : {}),
    }
  );

  const property = 'customer';
  await messageQueueService.add(TOPIC.INSURANCE_SCOPE_SELF_VALIDATION, {
    insuranceScopeId,
    property,
  });

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_scope_customer_update', lambda)
  )
);
