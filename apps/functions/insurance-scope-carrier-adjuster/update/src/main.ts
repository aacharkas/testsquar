import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceCarrierAdjusterDraftService from '@squaredash/crud/insurance-carrier-adjuster-draft';
import * as insuranceScopesService from '@squaredash/crud/insurance-scope';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { UpdateInsuranceCarrierAdjusterBody } from './models/update-insurance-carrier-adjuster-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.scopeId;
  await insuranceScopesService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  const parsedBody = JSON.parse(event.body);
  const payload =
    (await transformAndValidate<UpdateInsuranceCarrierAdjusterBody>(
      UpdateInsuranceCarrierAdjusterBody,
      parsedBody
    )) as UpdateInsuranceCarrierAdjusterBody;

  const id = event.pathParameters.id;
  const result = await insuranceCarrierAdjusterDraftService.update(
    { id },
    payload
  );

  const property = 'adjuster';
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
    hasRequiredPermissionsMiddleware(
      'insurance_carrier_adjuster_update',
      lambda
    )
  )
);
