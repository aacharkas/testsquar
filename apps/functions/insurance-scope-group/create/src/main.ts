import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import * as insuranceScopeGroupDraftService from '@squaredash/crud/insurance-scope-group-draft';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException, HTTP_STATUS } from '@squaredash/shared/util';

import { findGroupIndex } from './helpers';
import { CreateInsuranceScopeGroupBody } from './models/create-insurance-scope-group-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.scopeId;
  const scope = await insuranceScopeService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  const parsedBody = JSON.parse(event.body);
  const { parentId, ...payload } =
    (await transformAndValidate<CreateInsuranceScopeGroupBody>(
      CreateInsuranceScopeGroupBody,
      parsedBody
    )) as CreateInsuranceScopeGroupBody;

  const parentGroupIndex = findGroupIndex(scope.groups, parentId);

  // Max nested level - 5
  if (parentGroupIndex > 3) {
    throw new BadRequestException('Cannot add group. Max 5 nesting levels');
  }

  const result = await insuranceScopeGroupDraftService.create({
    ...payload,
    insuranceScopeDraft: {
      connect: {
        id: insuranceScopeId,
      },
    },
    ...(parentId
      ? {
          parent: {
            connect: { id: parentId },
          },
        }
      : {}),
  });

  const property = 'group';
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
    hasRequiredPermissionsMiddleware('insurance_scope_group_create', lambda)
  )
);
