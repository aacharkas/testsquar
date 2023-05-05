import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const emailTemplateGetSchema: FunctionSchema = {
  path: {
    route: '/api/email-template/{id}',
    method: HttpMethods.GET,
    value: {
      tags: ['Email Template'],
      summary: 'Get email templates by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetEmailTemplateOk',
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
      GetEmailTemplateOk: {
        description: 'Successfully fetched email template by id',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    templateId: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    defaultSubject: {
                      type: 'string',
                    },
                    defaultBody: {
                      type: 'string',
                    },
                    customFields: {
                      type: 'object',
                      properties: {
                        link: {
                          type: 'string',
                        },
                        dueDate: {
                          type: 'string',
                        },
                        emailBody: {
                          type: 'string',
                        },
                        emailSubject: {
                          type: 'string',
                        },
                      },
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                    },
                    techStatus: {
                      type: 'string',
                    },
                    companyEmailTemplate: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                          },
                          companyId: {
                            type: 'string',
                          },
                          emailTemplateId: {
                            type: 'string',
                          },
                          customBody: {
                            type: 'string',
                          },
                          customSubject: {
                            type: 'string',
                          },
                          createdBy: {
                            type: 'string',
                          },
                          updatedBy: {
                            type: 'string',
                          },
                          createdAt: {
                            type: 'string',
                            format: 'date-time',
                          },
                          updatedAt: {
                            type: 'string',
                            format: 'date-time',
                          },
                          techStatus: {
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
        },
      },
    },
  },
};
