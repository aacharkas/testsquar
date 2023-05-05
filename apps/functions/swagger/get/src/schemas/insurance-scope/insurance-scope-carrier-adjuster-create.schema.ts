import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeCarrierAdjusterCreateSchema: FunctionSchema = {
  path: {
    route:
      '/api/insurance-scope/{scopeId}/insurance-carrier/{carrierId}/adjuster',
    method: HttpMethods.POST,
    value: {
      summary: 'Create an insurance scope carrier adjuster info',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'scopeId',
          description: 'Insurance scope id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'carrierId',
          description: 'Insurance scope carrier id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateInsuranceScopeCarrierAdjuster',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/CreateInsuranceScopeCarrierAdjusterOk',
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    responses: {
      CreateInsuranceScopeCarrierAdjusterOk: {
        description:
          'Insurance scope carrier adjuster was successfully created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceCarrierAdjusterDraft',
            },
          },
        },
      },
    },
  },
};
