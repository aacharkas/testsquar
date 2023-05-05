import { OpenAPIV3 } from 'openapi-types';

import {
  SORTABLE_USER_COLUMNS,
  SORT_ORDER,
  USER_STATUS,
} from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const userListSchema: FunctionSchema = {
  path: {
    route: '/api/user/list',
    method: HttpMethods.GET,
    value: {
      tags: ['User'],
      summary: 'Get list of users',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'search',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            minLength: 3,
          },
        },
        {
          name: 'roles',
          in: 'query',
          required: false,
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['COMPANY_USER', 'COMPANY_ADMIN', 'COMPANY_OWNER'],
            },
          },
        },
        {
          name: 'statuses',
          in: 'query',
          required: false,
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.values(USER_STATUS),
            },
          },
        },
        {
          name: 'take',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
            minimum: 0,
            maximum: 100,
          },
        },
        {
          name: 'skip',
          in: 'query',
          required: false,
          schema: {
            type: 'number',
            minimum: 0,
          },
        },
        {
          name: 'sortOrder',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: Object.values(SORT_ORDER),
          },
        },
        {
          name: 'sortCol',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: Object.values(SORTABLE_USER_COLUMNS),
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetUsersListOk',
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
      GetUsersListOk: {
        description: 'Successfully fetched users',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
                totalCount: {
                  type: 'number',
                  example: 1,
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
