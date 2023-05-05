import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const customerDeleteSchema: FunctionSchema = {
  path: {
    route: '/api/customer/{id}',
    method: HttpMethods.DELETE,
    value: {
      tags: ['Customer'],
      summary: 'Delete customer by id',
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
        '204': {
          $ref: '#/components/responses/CustomerDeleteNoContent',
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
      CustomerDeleteNoContent: {
        description: 'Customer was successfully deleted',
      },
    },
  },
};
