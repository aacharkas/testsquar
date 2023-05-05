import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const customerGetSchema: FunctionSchema = {
  path: {
    route: '/api/customer/{id}',
    method: HttpMethods.GET,
    value: {
      tags: ['Customer'],
      summary: 'Get customer',
      description: 'Get customer by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'Customer id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetCustomerOk',
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
    responses: {
      GetCustomerOk: {
        description: 'Customer found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CustomerWithMeta',
            },
          },
        },
      },
    },
    schemas: {
      CustomerWithMeta: {
        allOf: [
          {
            $ref: '#/components/schemas/Customer',
          },
          {
            type: 'object',
            properties: {
              companyId: {
                type: 'string',
                example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
              },
              type: {
                type: 'string',
                enum: ['INDIVIDUAL', 'BUSINESS'],
                example: 'INDIVIDUAL',
              },
              billingName: {
                type: 'string',
                example: 'name',
              },
              billingAddressId: {
                type: 'string',
                format: 'uuid',
                example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
              },
              billingAddress: {
                $ref: '#/components/schemas/CreateAddressBody',
              },
              notes: {
                type: 'string',
                example: 'notes',
                nullable: true,
              },
              parent: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
                  },
                  displayName: {
                    type: 'string',
                    example: 'displayName',
                  },
                },
                nullable: true,
              },
              subCustomers: {
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
                      example: 'name',
                    },
                  },
                },
              },
            },
            required: [
              'companyId',
              'billingName',
              'billingAddressId',
              'billingAddress',
              'subCustomers',
            ],
          },
        ],
      },
    },
  },
};
