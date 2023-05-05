import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeValidateAccuracyResultsSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/validate-accuracy-results',
    method: HttpMethods.GET,
    value: {
      summary: 'Recieve results of insurance scope accuracy validation',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      responses: {
        '200': {
          $ref: '#/components/schemas/AccuracyCheckRun',
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
    schemas: {
      AccuracyCheckRun: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            readOnly: true,
          },
          startedAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true,
          },
          finishedAt: {
            type: 'string',
            format: 'date-time',
          },
          documents: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/DocumentAccuracy',
            },
          },
        },
      },
      DocumentAccuracy: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            readOnly: true,
          },
          name: {
            type: 'string',
          },
          accuracy: {
            type: 'number',
          },
          runId: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
    },
  },
};
