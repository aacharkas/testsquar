import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const verifyEmailSchema: FunctionSchema = {
  path: {
    route: '/api/auth/verify-email',
    method: HttpMethods.POST,
    value: {
      summary: "Verify user's email",
      tags: ['Auth'],
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
          $ref: '#/components/responses/VerifyEmailOk',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    responses: {
      VerifyEmailOk: {
        description: 'Verification succeeded',
        headers: {
          'Set-Cookie': {
            schema: {
              type: 'string',
            },
          },
        },
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};
