import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const jobLineItemsUpdate: FunctionSchema = {
  path: {
    route: '/api/job/{id}/line-items',
    method: HttpMethods.PUT,
    value: {
      summary: 'Update job line items',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      tags: ['Job'],
      parameters: [
        {
          name: 'id',
          description: 'Id of job',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  includedInJob: {
                    type: 'boolean',
                  },
                },
                required: ['id', 'includedInJob'],
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: "Job's line items have been updated",
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobWithMeta',
              },
            },
          },
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
