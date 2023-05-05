import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeSaveCustomerSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{id}/save-customer',
    method: HttpMethods.POST,
    value: {
      summary: 'Mark insurance scope as verified',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'Insurance scope id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/SaveInsuranceScopeCustomerBody',
      },
      responses: {
        '200': {
          description: 'Insurance scope has been marked as verified',
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
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    requestBodies: {
      SaveInsuranceScopeCustomerBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                customerDetails: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['INDIVIDUAL', 'BUSINESS'],
                    },
                    firstName: {
                      type: 'string',
                    },
                    lastName: {
                      type: 'string',
                    },
                    displayName: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                    },
                    phoneNumber: {
                      type: 'string',
                      format: 'phone-number',
                    },
                    billingInformation: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        address: {
                          $ref: '#/components/schemas/CreateAddressBody',
                        },
                      },
                      required: ['name', 'address'],
                    },
                    shippingInformation: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        address: {
                          $ref: '#/components/schemas/CreateAddressBody',
                        },
                      },
                      required: ['name', 'address'],
                    },
                  },
                  required: [
                    'type',
                    'firstName',
                    'lastName',
                    'displayName',
                    'email',
                    'phoneNumber',
                    'billingInformation',
                    'shippingInformation',
                  ],
                },
                customerId: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};
