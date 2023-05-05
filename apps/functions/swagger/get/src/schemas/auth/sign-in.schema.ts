import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const signInSchema: FunctionSchema = {
  path: {
    route: '/api/auth/sign-in',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Sign in',
      requestBody: {
        $ref: '#/components/requestBodies/SignIn',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/SignInOk',
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
  components: {
    requestBodies: {
      SignIn: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  example: 'john.doe@example.com',
                  minLength: 5,
                  maxLength: 254,
                },
                password: {
                  type: 'string',
                  example: 'john.doe12345',
                  minLength: 8,
                  maxLength: 128,
                },
              },
            },
          },
        },
      },
    },
    responses: {
      SignInOk: {
        description:
          'Successfully authenticated. The access token is returned in a cookie named access_token. You need to include this cookie in subsequent requests.',
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
                finishedOnboarding: {
                  type: 'boolean',
                },
              },
              required: ['accessToken', 'refreshToken'],
            },
          },
        },
      },
    },
  },
};
