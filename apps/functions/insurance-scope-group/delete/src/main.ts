import { PrismaClient } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import * as insuranceScopeGroupDraftService from '@squaredash/crud/insurance-scope-group-draft';
import * as insuranceScopeLineItemDraftService from '@squaredash/crud/insurance-scope-line-item-draft';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { prisma } from '@squaredash/shared/db';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException, HTTP_STATUS } from '@squaredash/shared/util';

import { getGroupIdsToDelete } from './helpers';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.scopeId;
  const scope = await insuranceScopeService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  const groupId = event.pathParameters.id;
  const groupIdsToDelete = getGroupIdsToDelete(scope.groups, groupId);

  if (!groupIdsToDelete.length) {
    throw new BadRequestException('Invalid group id');
  }

  await prisma.$transaction(async (tx: PrismaClient) => {
    await insuranceScopeLineItemDraftService.deleteMany(
      { insuranceScopeGroupDraftId: { in: groupIdsToDelete } },
      tx
    );
    await insuranceScopeGroupDraftService.deleteMany(
      { id: { in: groupIdsToDelete } },
      tx
    );
  });

  const property = 'group';
  await messageQueueService.add(TOPIC.INSURANCE_SCOPE_SELF_VALIDATION, {
    insuranceScopeId,
    property,
  });

  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_scope_group_delete', lambda)
  )
);
