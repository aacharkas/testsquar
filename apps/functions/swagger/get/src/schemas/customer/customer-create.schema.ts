import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const customerCreateSchema: FunctionSchema = {
  path: {
    route: '/api/customer',
    method: HttpMethods.POST,
    value: {
      tags: ['Customer'],
      summary: 'Create a customer',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/CreateCustomer',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/CreateCustomerCreated',
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
      CreateCustomer: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['INDIVIDUAL', 'BUSINESS'],
                  example: 'INDIVIDUAL',
                },
                firstName: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 100,
                  example: 'firstName',
                },
                lastName: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 100,
                  example: 'lastName',
                },
                displayName: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 200,
                  example: 'firstName lastName',
                },
                email: {
                  type: 'string',
                  minLength: 5,
                  maxLength: 254,
                  example: 'email@email.com',
                },
                phone: {
                  type: 'string',
                  example: '+375297364834',
                },
                billingName: {
                  type: 'string',
                  example: 'billingName',
                },
                billingAddress: {
                  $ref: '#/components/schemas/CreateAddressBody',
                },
                shippingName: {
                  type: 'string',
                  example: 'shippingName',
                },
                shippingAddress: {
                  $ref: '#/components/schemas/CreateAddressBody',
                },
                parentId: {
                  type: 'string',
                  format: 'uuid',
                  example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
                },
                responsibleMemberIds: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'uuid',
                    example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
                  },
                },
                companyId: {
                  type: 'string',
                  example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
                },
                notes: {
                  type: 'string',
                  example: 'some notes',
                },
              },
              required: [
                'firstName',
                'lastName',
                'email',
                'phone',
                'billingAddress',
                'shippingAddress',
              ],
            },
          },
        },
      },
    },
    responses: {
      CreateCustomerCreated: {
        description: 'Successfully created a customer',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Customer',
            },
          },
        },
      },
    },
    schemas: {
      Customer: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb628',
          },
          displayName: {
            type: 'string',
            example: 'name',
          },
          email: {
            type: 'string',
            example: 'email@gmail.com',
          },
          phone: {
            type: 'string',
            example: '375297364834',
          },
          billingName: {
            type: 'string',
            example: 'name',
          },
          billingAddressId: {
            type: 'string',
            example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
          },
          billingAddress: {
            $ref: '#/components/schemas/CreateAddressBody',
          },
          parentId: {
            type: 'string',
            format: 'uuid',
            example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
            nullable: true,
          },
          responsibleMembers: {
            $ref: '#/components/schemas/responsibleMembersList',
          },
          createdAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
        },
        required: [
          'id',
          'displayName',
          'email',
          'phone',
          'billingName',
          'billingAddressId',
          'billingAddress',
          'responsibleMembers',
          'parentId',
          'createdAt',
          'updatedAt',
        ],
      },
      responsibleMembersList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
          },
          required: ['id', 'name'],
        },
      },
    },
  },
};
