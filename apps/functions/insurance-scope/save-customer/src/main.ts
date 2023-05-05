import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as customerDraftService from '@squaredash/crud/customer-draft';
import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import { InsuranceScopeWithMeta } from '@squaredash/crud/insurance-scope';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException, HTTP_STATUS } from '@squaredash/shared/util';

import { SaveCustomerDetailsBody } from './models/save-customer-details.body';
import { SaveCustomerBody } from './models/save-customer.body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const { scope, customer } = await validateEvent(event);

  const saveCustomerDetails =
    typeof customer === 'string'
      ? customer
      : {
          ...customer,
          responsibleMemberId: context.user.id,
          company: context.user.companyId,
        };
  const savedCustomer = await customerDraftService.saveById(
    scope.customer.id,
    saveCustomerDetails
  );

  const scopeId = scope.id;
  const property = 'customer';
  await messageQueueService.add(TOPIC.INSURANCE_SCOPE_SELF_VALIDATION, {
    scopeId,
    property,
  });

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(savedCustomer),
  };
};

const validateEvent = async (
  event: APIGatewayEvent
): Promise<{
  scope: InsuranceScopeWithMeta;
  customer: SaveCustomerDetailsBody | string;
}> => {
  const scope = await insuranceScopeService.findWithMeta({
    id: event.pathParameters.id,
  });

  const saveCustomerBody = (await transformAndValidate(
    SaveCustomerBody,
    event.body,
    {
      validator: {
        whitelist: true,
      },
    }
  )) as SaveCustomerBody;

  if (saveCustomerBody.customerDetails && saveCustomerBody.customerId) {
    throw new BadRequestException(
      'Body must contain customerDetails or customerId. Never both'
    );
  }

  if (saveCustomerBody.customerId) {
    return { scope, customer: saveCustomerBody.customerId };
  }

  if (saveCustomerBody.customerDetails) {
    return { scope, customer: saveCustomerBody.customerDetails };
  }

  throw new BadRequestException(
    'Body must include at least one of customerDetails or customerId'
  );
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_scope_save_customer', lambda)
  )
);
