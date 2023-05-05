import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeGroupUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{scopeId}/groups/{id}',
    method: HttpMethods.PUT,
    value: {
      summary: 'Update an insurance scope group',
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
          name: 'id',
          description: 'Insurance scope group id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateInsuranceScopeGroup',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/InsuranceScopeGroupUpdateOk',
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
      UpdateInsuranceScopeGroup: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                notes: {
                  type: 'string',
                },
                totalTax: {
                  type: 'number',
                  example: 137.54,
                },
                totalRCV: {
                  type: 'number',
                  example: 137.54,
                },
                totalACV: {
                  type: 'number',
                  example: 137.54,
                },
                depreciation: {
                  type: 'number',
                  example: 137.54,
                },
                overhead: {
                  type: 'number',
                  example: 137.54,
                },
              },
            },
          },
        },
      },
    },
    responses: {
      InsuranceScopeGroupUpdateOk: {
        description: 'Insurance scope group was successfully updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceScopeGroupDraft',
            },
          },
        },
      },
    },
  },
};
