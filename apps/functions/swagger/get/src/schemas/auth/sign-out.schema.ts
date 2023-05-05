import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const signOutSchema: FunctionSchema = {
  path: {
    route: '/api/auth/sign-out',
    method: HttpMethods.POST,
    value: {
      summary: 'Sign out',
      tags: ['Auth'],
      responses: {
        '204': {
          $ref: '#/components/responses/SignOutNoBody',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
    },
  },
  components: {
    responses: {
      SignOutNoBody: {
        description: 'Successful sign out',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  },
};
