import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const getUploadUrlSchema: FunctionSchema = {
  path: {
    route: '/api/file/upload-url/{type}',
    method: HttpMethods.GET,
    value: {
      tags: ['File'],
      description: 'Get a presigned URL for file upload',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'type',
          description: 'Type of upload',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: 'company-avatar',
          },
        },
        {
          name: 'extension',
          description: 'extension of a file to be uploaded',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
            example: 'jpg',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetUploadUrlOk',
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
      GetUploadUrlOk: {
        description: 'File has been successfully update',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                  example: '7c2c6dab-6dcd-4e2e-9270-17bee9d5c440',
                },
                signedUrl: {
                  type: 'string',
                  format: 'url',
                },
              },
            },
          },
        },
      },
    },
  },
};
