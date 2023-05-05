import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const jobContractDeleteSchema: FunctionSchema = {
  path: {
    route: '/api/job-contract/{id}',
    method: HttpMethods.DELETE,
    value: {
      summary: 'Delete a job contract',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      tags: ['Job Contract'],
      description: 'Delete a job contract',
      parameters: [
        {
          name: 'id',
          description: 'Id of a job contract',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '204': {
          description: 'Job contract has been deleted',
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
