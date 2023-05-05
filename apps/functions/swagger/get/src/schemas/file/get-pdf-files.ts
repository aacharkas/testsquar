import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const getPdfFilesSchema: FunctionSchema = {
  path: {
    route: '/api/file/get-pdf-files',
    method: HttpMethods.GET,
    value: {
      tags: ['File'],
      description: 'Get a list of pdf files',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      responses: {
        '200': {
          $ref: '#/components/responses/filesList',
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
    responses: {
      filesList: {
        description: 'List of pdf files',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
