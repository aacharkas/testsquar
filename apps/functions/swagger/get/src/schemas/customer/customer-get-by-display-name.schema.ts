import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const customerGetByDisplayNameSchema: FunctionSchema = {
  path: {
    route: '/api/customer/display-name/{displayName}',
    method: HttpMethods.GET,
    value: {
      tags: ['Customer'],
      summary: 'Get customer',
      description: 'Get customer by display name',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'displayName',
          description: 'Customer display name',
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
      GetCustomerByDisplayNameOk: {
        description: 'Found customer by given display name',
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
