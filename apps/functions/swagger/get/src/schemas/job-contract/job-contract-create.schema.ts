import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const jobContractCreateSchema: FunctionSchema = {
  path: {
    route: '/api/job/{id}/contract',
    method: HttpMethods.POST,
    value: {
      summary: 'Create a job contract',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      tags: ['Job Contract'],
      description: 'Create a job-contract',
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
        '201': {
          description: 'Job contract has been created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobContract',
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
  components: {
    requestBodies: {
      JobContractCreateBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                initialDocumentName: {
                  type: 'string',
                },
                fileId: {
                  type: 'string',
                },
              },
              required: ['initialDocumentName', 'fileId'],
            },
          },
        },
      },
    },
    schemas: {
      JobContract: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          initialDocumentName: {
            type: 'string',
          },
          fileId: {
            type: 'string',
          },
          techStatus: {
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
          },
          jobId: {
            type: 'string',
          },
          fileSize: {
            type: 'number',
          },
          link: {
            type: 'string',
          },
        },
        required: [
          'id',
          'initialDocumentName',
          'fileId',
          'techStatus',
          'jobId',
          'fileSize',
          'link',
        ],
      },
    },
  },
};
