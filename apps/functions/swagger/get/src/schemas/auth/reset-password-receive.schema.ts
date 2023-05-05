import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const resetPasswordReceiveSchema: FunctionSchema = {
  path: {
    route: '/api/auth/reset-password/recieve',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Reset password',
      parameters: [
        {
          name: 'token',
          description: 'Reset password token',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                password: {
                  type: 'string',
                  format: 'password',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successfully changed password',
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
