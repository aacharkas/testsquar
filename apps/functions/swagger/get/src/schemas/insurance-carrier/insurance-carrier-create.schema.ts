import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceCarrierCreateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-carrier',
    method: HttpMethods.POST,
    value: {
      tags: ['Insurance Carrier'],
      summary: 'Create a insurance-carrier',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/CreateInsuranceCarrier',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/CreateInsuranceCarrierCreated',
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
      CreateInsuranceCarrier: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 200,
                  example: 'firstName',
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
                fax: {
                  type: 'string',
                  example: '+375297364834',
                },
                address: {
                  $ref: '#/components/schemas/CreateAddressBody',
                },
              },
              required: ['name'],
            },
          },
        },
      },
    },
    responses: {
      CreateInsuranceCarrierCreated: {
        description: 'Successfully created a insurance-carrier',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceCarrier',
            },
          },
        },
      },
    },
    schemas: {
      InsuranceCarrier: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb628',
          },
          name: {
            type: 'string',
            example: 'some name',
          },
          email: {
            type: 'string',
            example: 'email@email.com',
          },
          phone: {
            type: 'string',
            example: '+375297364834',
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
        required: ['id', 'name', 'email', 'phone', 'updatedAt', 'createdAt'],
      },
    },
  },
};
