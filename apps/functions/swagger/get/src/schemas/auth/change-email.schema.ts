import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const changeEmailSchema: FunctionSchema = {
  path: {
    route: '/api/auth/change-email',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: "Change company member's email by id",
      requestBody: {
        $ref: '#/components/requestBodies/ChangeEmailBody',
      },
      responses: {
        '204': {
          description:
            'Change email request has been created and verification email has been sent',
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
      ChangeEmailBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                },
                userId: {
                  type: 'string',
                },
              },
              required: ['email', 'userId'],
            },
          },
        },
      },
    },
    responses: {},
  },
};
