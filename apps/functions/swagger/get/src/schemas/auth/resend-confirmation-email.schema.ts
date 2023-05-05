import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const resendConfirmationEmailSchema: FunctionSchema = {
  path: {
    route: '/api/auth/resend-confirmation-email',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Reset password',
      responses: {
        '201': {
          description: 'Successfully resend confirmation email',
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
  components: {},
};
