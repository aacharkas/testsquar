import { PrismaClient } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { ScopeProcessor } from '@squaredash/scope-processor';
import { UPLOAD_TYPE, UPLOAD_TYPE_MAP } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { ScopeContent } from '@squaredash/shared/models';
import {
  BadRequestException,
  Config,
  HTTP_STATUS,
} from '@squaredash/shared/util';
import * as wsService from '@squaredash/websockets';
import { PostToChannelPayload, TriggerableEvent } from '@squaredash/websockets';

import { createEntities } from './app/create-entities';
import { handleNewVersionCreation } from './app/handle-new-version-creation';
import { ImportInsuranceScopeBody } from './models/import-insurance-scope-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const parsedBody = JSON.parse(event.body);
  const creatorId = context.user.id;
  const companyId = context.user.companyId;

  const body = (await transformAndValidate<ImportInsuranceScopeBody>(
    ImportInsuranceScopeBody,
    parsedBody
  )) as ImportInsuranceScopeBody;

  const postToChannelPayload: PostToChannelPayload<TriggerableEvent.PROGRESS_UPDATED> =
    {
      channel: `private-import-scope-${body.objectId}`,
      event: TriggerableEvent.PROGRESS_UPDATED,
      data: {
        progress: 25,
      },
    };
  await wsService.postToChannel(postToChannelPayload);

  const uploadConfig = UPLOAD_TYPE_MAP[UPLOAD_TYPE.INSURANCE_SCOPE];
  const objectPath = `${uploadConfig.prefix}/${body.objectId}`;
  const scopeProcessor = new ScopeProcessor();

  const content: ScopeContent = await scopeProcessor.processFile(
    Config.AWS.publicBucket,
    objectPath
  );

  if (!content) {
    throw new BadRequestException('Failed to import insurance scope');
  }

  postToChannelPayload.data.progress = 50;
  await wsService.postToChannel(postToChannelPayload);

  const resultsConfig = UPLOAD_TYPE_MAP[UPLOAD_TYPE.INSURANCE_SCOPE_EXTRACTED];
  const resultsPath = `${resultsConfig.prefix}/${body.objectId}`;

  await scopeProcessor.uploadScopeContentToS3(
    content,
    Config.AWS.publicBucket,
    resultsPath
  );

  postToChannelPayload.data.progress = 75;
  await wsService.postToChannel(postToChannelPayload);

  const response = await prisma.$transaction(
    async (tx: PrismaClient) => {
      const versionId = await handleNewVersionCreation(companyId, content, tx);

      return createEntities(content, body, creatorId, companyId, versionId, tx);
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
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
