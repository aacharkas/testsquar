import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import * as insuranceScopeLineItemDraftService from '@squaredash/crud/insurance-scope-line-item-draft';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { getCreationPayload } from './helpers';
import { CreateInsuranceScopeLineItemBody } from './models/create-insurance-scope-line-item-body';

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
  const body = (await transformAndValidate<CreateInsuranceScopeLineItemBody>(
    CreateInsuranceScopeLineItemBody,
    parsedBody
  )) as CreateInsuranceScopeLineItemBody;

  const groupId = event.pathParameters.groupId;
  const payload = getCreationPayload(body, insuranceScopeId, groupId);
  const result = await insuranceScopeLineItemDraftService.create(payload);

  const property = 'lineItem';
  await messageQueueService.add(TOPIC.INSURANCE_SCOPE_SELF_VALIDATION, {
    insuranceScopeId,
    property,
  });

  return {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_scope_line_item_create', lambda)
  )
);
