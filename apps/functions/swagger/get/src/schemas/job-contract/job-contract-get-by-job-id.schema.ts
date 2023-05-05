import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const jobContractGetByJobIdSchema: FunctionSchema = {
  path: {
    route: '/api/job/{id}/contract',
    method: HttpMethods.GET,
    value: {
      summary: 'Get a list of job contracts',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      tags: ['Job Contract'],
      description: 'Get a list of job contracts associated with a job',
      parameters: [
        {
          name: 'id',
          description: 'Id of a job',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successfully fetched a list of job contracts',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/JobContract',
                },
              },
            },
          },
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {},
};
