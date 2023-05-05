import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeValidateAccuracySchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/validate-accuracy',
    method: HttpMethods.POST,
    value: {
      summary: 'Start validation of insurance scope accuracy',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      responses: {
        '200': {
          $ref: '#/components/responses/noContent',
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
    responses: {
      noContent: {
        description: 'No content',
      },
    },
  },
};
