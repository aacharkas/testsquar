import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import { UPLOAD_TYPE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS, getFileLink } from '@squaredash/shared/util';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const insuranceScopeId = event.pathParameters.id;

  const scope = await insuranceScopeService.validateAndGetInsuranceScope(
    insuranceScopeId,
    context
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...scope,
      initialDocumentLink: getFileLink(
        scope.initialDocumentId,
        UPLOAD_TYPE.INSURANCE_SCOPE
      ),
    }),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('insurance_scope_get', lambda))
);
