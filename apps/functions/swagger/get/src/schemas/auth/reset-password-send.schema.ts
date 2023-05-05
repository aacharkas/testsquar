import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const resetPasswordSendSchema: FunctionSchema = {
  path: {
    route: '/api/auth/reset-password/send',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Reset password',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                },
              },
              required: ['email'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successfully sent reset password email',
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {},
};
