import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeCustomerUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{scopeId}/customer/{id}',
    method: HttpMethods.PUT,
    value: {
      summary: 'Update an insurance scope customer',
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
          description: 'Insurance scope customer id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateInsuranceScopeCustomer',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/InsuranceScopeCustomerUpdateOk',
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
      UpdateInsuranceScopeCustomer: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                displayName: {
                  type: 'string',
                  nullable: true,
                },
                type: {
                  type: 'string',
                  nullable: true,
                },
                firstName: {
                  type: 'string',
                  nullable: true,
                },
                lastName: {
                  type: 'string',
                  nullable: true,
                },
                email: {
                  type: 'string',
                  nullable: true,
                },
                phone: {
                  type: 'string',
                  nullable: true,
                },
                propertyAddress: {
                  type: 'string',
                  nullable: true,
                },
                shippingAddress: {
                  type: 'string',
                  nullable: true,
                },
                customerId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      InsuranceScopeCustomerUpdateOk: {
        description: 'Insurance scope customer was successfully updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CustomerDraft',
            },
          },
        },
      },
    },
  },
};
