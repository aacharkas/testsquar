import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const submitChangeEmailSchema: FunctionSchema = {
  path: {
    route: '/api/auth/submit-change-email',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Submit change email',
      requestBody: {
        $ref: 'SubmitChangeEmail',
      },
      responses: {
        '200': {
          description: 'Procedure of changing email has been completed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
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
  components: {
    requestBodies: {
      SubmitChangeEmail: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                  format: 'password',
                },
              },
              required: ['token', 'password'],
            },
          },
        },
      },
    },
  },
};
