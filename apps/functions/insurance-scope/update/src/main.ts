import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import * as insuranceScopeDraftService from '@squaredash/crud/insurance-scope-draft';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { UPLOAD_TYPE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS, getFileLink } from '@squaredash/shared/util';

import { UpdateInsuranceScopeBody } from './models/update-insurance-scope-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.id;
  await insuranceScopeService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  const parsedBody = JSON.parse(event.body);
  const body = (await transformAndValidate<UpdateInsuranceScopeBody>(
    UpdateInsuranceScopeBody,
    parsedBody
  )) as UpdateInsuranceScopeBody;

  const result = await insuranceScopeDraftService.update(
    { id: insuranceScopeId },
    body
  );

  const property = Object.keys(body).find((key) => body[key]);
  await messageQueueService.add(TOPIC.INSURANCE_SCOPE_SELF_VALIDATION, {
    insuranceScopeId,
    property,
  });

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...result,
      initialDocumentLink: getFileLink(
        result.initialDocumentId,
        UPLOAD_TYPE.INSURANCE_SCOPE
      ),
    }),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('insurance_scope_update', lambda))
);
