import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceCarrierDraftService from '@squaredash/crud/insurance-carrier-draft';
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

import { UpdateInsuranceScopeCarrierBody } from './models/update-insurance-scope-carrier-body';

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
  const { insuranceCarrierId, ...payload } =
    (await transformAndValidate<UpdateInsuranceScopeCarrierBody>(
      UpdateInsuranceScopeCarrierBody,
      parsedBody
    )) as UpdateInsuranceScopeCarrierBody;

  const id = event.pathParameters.id;
  const result = await insuranceCarrierDraftService.update(
    { id },
    {
      ...payload,
      ...(insuranceCarrierId
        ? {
            insuranceCarrier: { connect: { id: insuranceCarrierId } },
          }
        : {}),
    }
  );

  const property = 'insuranceCarrier';
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
    hasRequiredPermissionsMiddleware('insurance_scope_carrier_update', lambda)
  )
);
