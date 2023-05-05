import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeLineItemCreateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{scopeId}/groups/{groupId}/items',
    method: HttpMethods.POST,
    value: {
      summary: 'Create an insurance scope line item',
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
          name: 'groupId',
          description: 'Insurance scope group id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/CreateInsuranceScopeLineItem',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/InsuranceScopeLineItemCreateOk',
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
      CreateInsuranceScopeLineItem: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                },
                sequence: {
                  type: 'number',
                },
                notes: {
                  type: 'string',
                },
                quantity: {
                  type: 'number',
                  example: 137.54,
                },
                unitOfMeasurement: {
                  type: 'string',
                },
                unitPrice: {
                  type: 'number',
                  example: 137.54,
                },
                tax: {
                  type: 'number',
                  example: 137.54,
                },
                overhead: {
                  type: 'number',
                  example: 137.54,
                },
                rcv: {
                  type: 'number',
                  example: 137.54,
                },
                acv: {
                  type: 'number',
                  example: 137.54,
                },
                ageLife: {
                  type: 'string',
                },
                condition: {
                  type: 'string',
                },
                depreciationPercentage: {
                  type: 'number',
                  example: 13.33,
                },
                depreciationSum: {
                  type: 'number',
                  example: 137.54,
                },
                isDepreciationRefundable: {
                  type: 'boolean',
                },
                claimItemId: {
                  type: 'string',
                  format: 'uuid',
                },
                claimItem: {
                  $ref: '#/components/schemas/ClaimItemCreate',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      InsuranceScopeGroupCreateOk: {
        description: 'Insurance scope line item was successfully created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceScopeLineItemDraft',
            },
          },
        },
      },
    },
  },
};
