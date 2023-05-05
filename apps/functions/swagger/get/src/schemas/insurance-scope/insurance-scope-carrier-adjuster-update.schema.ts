import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeCarrierAdjsterUpdateSchema: FunctionSchema = {
  path: {
    route:
      '/api/insurance-scope/{scopeId}/insurance-carrier/{carrierId}/adjuster/{id}',
    method: HttpMethods.PUT,
    value: {
      summary: 'Update an insurance scope carrier adjuster info',
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
        {
          name: 'id',
          description: 'Insurance scope carrier adjuster id',
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
        '200': {
          $ref: '#/components/responses/InsuranceScopeImportOk',
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
    requestBodies: {
      UpdateInsuranceScopeCarrierAdjuster: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['ESTIMATOR', 'CLAIM_REP'],
                  example: 'ESTIMATOR',
                },
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                phone: {
                  type: 'string',
                },
                address: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      UpdateInsuranceScopeCarrierOk: {
        description:
          'Insurance scope carrier adjuster was successfully updated',
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
