import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as insuranceCarrierAdjusterDraftService from '@squaredash/crud/insurance-carrier-adjuster-draft';
import * as insuranceScopesService from '@squaredash/crud/insurance-scope';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { CreateInsuranceCarrierAdjusterBody } from './models/create-insurance-carrier-adjuster-body';

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
    (await transformAndValidate<CreateInsuranceCarrierAdjusterBody>(
      CreateInsuranceCarrierAdjusterBody,
      parsedBody
    )) as CreateInsuranceCarrierAdjusterBody;

  const carrierId = event.pathParameters.carrierId;
  const result = await insuranceCarrierAdjusterDraftService.create({
    ...payload,
    insuranceCarrierDraft: {
      connect: {
        id: carrierId,
      },
    },
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
    hasRequiredPermissionsMiddleware(
      'insurance_carrier_adjuster_create',
      lambda
    )
  )
);
