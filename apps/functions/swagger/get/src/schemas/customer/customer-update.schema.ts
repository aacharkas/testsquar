import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const customerUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/customer/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['Customer'],
      summary: 'Update customer by id',
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
      requestBody: {
        $ref: '#/components/requestBodies/CreateCustomer',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateCustomerOk',
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
    responses: {
      UpdateCustomerOk: {
        description: 'Successfully updated customer',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Customer',
            },
          },
        },
      },
    },
  },
};
