import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const userStatusUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/user/{id}/status',
    method: HttpMethods.PUT,
    value: {
      tags: ['User'],
      summary: 'Update user status by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'User id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '204': {
          $ref: '#/components/responses/UserStatusUpdateNoContent',
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
      UserStatusUpdateNoContent: {
        description: "User's status was successfully updated",
      },
    },
  },
};
