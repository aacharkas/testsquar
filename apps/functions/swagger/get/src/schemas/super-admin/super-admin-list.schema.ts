import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const superAdminListSchema: FunctionSchema = {
  path: {
    route: '/api/super-admin/list',
    method: HttpMethods.GET,
    value: {
      summary: 'Get list of super admins',
      tags: ['Super Admin'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      responses: {
        '200': {
          $ref: '#/components/responses/GetSuperAdminsListOk',
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
      GetSuperAdminsListOk: {
        description: 'Successfully fetches list of Super Admins',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      email: {
                        type: 'string',
                        format: 'email',
                      },
                    },
                    required: ['name', 'email'],
                  },
                },
                totalCount: {
                  type: 'number',
                  format: 'int',
                },
              },
              required: ['rows', 'totalCount'],
            },
          },
        },
      },
    },
  },
};
