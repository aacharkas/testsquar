import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as insuranceCarrierAdjusterDraftService from '@squaredash/crud/insurance-carrier-adjuster-draft';
import * as insuranceScopesService from '@squaredash/crud/insurance-scope';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.scopeId;
  await insuranceScopesService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  const id = event.pathParameters.id;
  await insuranceCarrierAdjusterDraftService.deleteAdjuster({ id });

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
    hasRequiredPermissionsMiddleware(
      'insurance_carrier_adjuster_delete',
      lambda
    )
  )
);
