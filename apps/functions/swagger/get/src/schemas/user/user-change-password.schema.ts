import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const userChangePasswordSchema: FunctionSchema = {
  path: {
    route: '/api/user/change-password',
    method: HttpMethods.POST,
    value: {
      tags: ['User'],
      summary: "Change user's password",
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/ChangePassword',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/ChangePasswordOk',
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
      ChangePassword: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                oldPassword: {
                  type: 'string',
                  format: 'password',
                  example: 'johnDoe3456',
                  minLength: 8,
                  maxLength: 128,
                },
                newPassword: {
                  type: 'string',
                  format: 'password',
                  example: 'johnDoe34567',
                  minLength: 8,
                  maxLength: 128,
                },
              },
              required: ['oldPassword', 'newPassword'],
            },
          },
        },
      },
    },
    responses: {
      ChangePasswordOk: {
        description: 'Successfully changed password',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'IM0052',
                },
              },
            },
          },
        },
      },
    },
  },
};
