import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeGroupCreateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{scopeId}/groups',
    method: HttpMethods.POST,
    value: {
      summary: 'Create an insurance scope group',
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
      ],
      requestBody: {
        $ref: '#/components/requestBodies/CreateInsuranceScopeGroup',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/InsuranceScopeGroupCreateOk',
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
      CreateInsuranceScopeGroup: {
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
                parentId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
              required: ['name', 'notes'],
            },
          },
        },
      },
    },
    responses: {
      InsuranceScopeGroupCreateOk: {
        description: 'Insurance scope group was successfully created',
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
