import { InsuranceScopeStatus, PrismaClient } from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import * as insuranceScopeCrud from '@squaredash/crud/insurance-scope';
import * as insuranceScopeDraftService from '@squaredash/crud/insurance-scope-draft';
import * as insuranceScopeLineItemDraftsService from '@squaredash/crud/insurance-scope-line-item-draft';
import * as insuranceScopeValidationRunService from '@squaredash/crud/insurance-scope-validation-run';
import * as jobService from '@squaredash/job';
import { prisma } from '@squaredash/shared/db';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException, HTTP_STATUS } from '@squaredash/shared/util';

import { saveInsuranceScope } from './app/save-insurance-scope';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  return prisma.$transaction(async (tx) => {
    const transaction = tx as PrismaClient;

    const insuranceScopeId = event.pathParameters.id;

    await insuranceScopeService.validateAndGetInsuranceScope(
      insuranceScopeId,
      context,
      transaction
    );
    const isErrorsInLastValidationRun =
      await insuranceScopeValidationRunService.isErrorsInValidationNotifications(
        insuranceScopeId
      );
    if (isErrorsInLastValidationRun) {
      throw new BadRequestException('There are errors in insurance scope');
    }

    await insuranceScopeLineItemDraftsService.saveByInsuranceScopeId(
      insuranceScopeId,
      transaction
    );

    await insuranceScopeDraftService.update(
      { id: insuranceScopeId },
      { status: InsuranceScopeStatus.VERIFIED },
      transaction
    );

    const savedInsuranceScope = await saveInsuranceScope(
      insuranceScopeId,
      transaction
    );

    const job = await jobService.handleScopeVerification(
      insuranceScopeId,
      context.user.id,
      transaction
    );

    await insuranceScopeCrud.update(
      {
        where: {
          id: savedInsuranceScope.id,
        },
        data: {
          status: InsuranceScopeStatus.JOB_CREATED,
        },
      },
      transaction
    );

    const updatedScope = await insuranceScopeService.findWithMeta(
      {
        id: savedInsuranceScope.id,
      },
      transaction
    );

    return {
      statusCode: HTTP_STATUS.OK,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedScope,
        jobId: job.versionId,
      }),
    };
  });
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_scope_mark_verified', lambda)
  )
);
