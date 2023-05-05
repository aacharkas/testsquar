import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const verifyNewEmailSchema: FunctionSchema = {
  path: {
    route: '/api/auth/verify-new-email',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Verify new email',
      parameters: [
        {
          name: 'token',
          required: true,
          in: 'query',
          schema: {
            type: 'string',
          },
          description: 'Verification token of a user',
        },
      ],
      responses: {
        '200': {
          description: 'Verify link has been successfully used',
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
