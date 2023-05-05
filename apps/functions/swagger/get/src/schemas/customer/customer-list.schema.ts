import { OpenAPIV3 } from 'openapi-types';

import {
  CUSTOMER_CATEGORY,
  SORTABLE_CUSTOMER_COLUMNS,
  SORT_ORDER,
} from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const customerListSchema: FunctionSchema = {
  path: {
    route: '/api/customer/list',
    method: HttpMethods.GET,
    value: {
      tags: ['Customer'],
      summary: 'Get list of customers',
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
            enum: Object.values(SORTABLE_CUSTOMER_COLUMNS),
          },
        },
        {
          name: 'category',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: Object.values(CUSTOMER_CATEGORY),
          },
        },
        {
          name: 'responsibleMembers',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            example: 'john,alex',
          },
        },
        {
          name: 'parents',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            example: 'Johnathan',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetCustomersOk',
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
      GetCustomersOk: {
        description: 'Successfully fetched list of customers',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Customer',
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
