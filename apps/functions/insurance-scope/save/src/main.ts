import { PrismaClient } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { prisma } from '@squaredash/shared/db';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { ScopeContent } from '@squaredash/shared/models';
import { BadRequestException, HTTP_STATUS } from '@squaredash/shared/util';
import * as wsService from '@squaredash/websockets';
import { PostToChannelPayload, TriggerableEvent } from '@squaredash/websockets';

import { createEntities } from '../../import/src/app/create-entities';
import { getFromS3 } from './app/get-from-s3';
import { getVersionId } from './app/get-version-id';
import { SaveInsuranceScopeBody } from './models/save-insurance-scope-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const creatorId = context.user.id;
  const companyId = context.user.companyId;

  const body = (await transformAndValidate<SaveInsuranceScopeBody>(
    SaveInsuranceScopeBody,
    parsedBody
  )) as SaveInsuranceScopeBody;

  const postToChannelPayload: PostToChannelPayload<TriggerableEvent.PROGRESS_UPDATED> =
    {
      channel: `private-import-scope-${body.objectId}`,
      event: TriggerableEvent.PROGRESS_UPDATED,
      data: {
        progress: 75,
      },
    };

  const content: ScopeContent = await getFromS3(body.objectId);
  if (!content) {
    throw new BadRequestException('Failed to save insurance scope');
  }

  const versionId = await getVersionId(body.mode, companyId, content);
  const response = await prisma.$transaction(async (tx: PrismaClient) =>
    createEntities(content, body, creatorId, companyId, versionId, tx)
  );

  postToChannelPayload.data.progress = 100;
  await wsService.postToChannel(postToChannelPayload);

  await messageQueueService.add(TOPIC.INSURANCE_SCOPE_SELF_VALIDATION, {
    insuranceScopeId: response.id,
  });

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('insurance_scope_import', lambda))
);
