import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const emailTemplateUpsertSchema: FunctionSchema = {
  path: {
    route: '/api/email-template',
    method: HttpMethods.POST,
    value: {
      tags: ['Email Template'],
      summary: 'Upsert email template by template id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/EmailTemplate',
      },
      responses: {
        '204': {
          $ref: '#/components/responses/UpsertEmailTemplateNoContent',
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
    responses: {
      UpsertEmailTemplateNoContent: {
        description: 'Successfully upsert email template',
      },
    },
    requestBodies: {
      EmailTemplate: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                templateId: {
                  type: 'string',
                },
                customSubject: {
                  type: 'string',
                },
                customBody: {
                  type: 'string',
                },
                customButtonText: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};
