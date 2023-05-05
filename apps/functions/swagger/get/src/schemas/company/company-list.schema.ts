import { OpenAPIV3 } from 'openapi-types';

import { SORTABLE_COMPANY_COLUMNS } from '@squaredash/shared/constants';
import { SORT_ORDER, TECH_STATUS } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyListSchema: FunctionSchema = {
  path: {
    route: '/api/company',
    method: HttpMethods.GET,
    value: {
      tags: ['Company'],
      summary: 'Get list of companies',
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
            enum: Object.values(SORTABLE_COMPANY_COLUMNS),
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetCompaniesOk',
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
      GetCompaniesOk: {
        description: 'Successfully fetched list of companies',
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
                      id: {
                        type: 'string',
                      },
                      name: {
                        type: 'string',
                        example: 'Google',
                      },
                      status: {
                        type: 'string',
                        enum: Object.values(TECH_STATUS),
                      },
                      owners: {
                        $ref: '#/components/schemas/OwnersList',
                      },
                      avatar: {
                        type: 'string',
                        format: 'url',
                        example:
                          'https://dev-squaredash-public.s3.amazonaws.com/company-avatar/091450b2-9cb1-4f5e-b0fb-8fd9c43730eb',
                        nullable: true,
                      },
                    },
                    required: ['id', 'name', 'status', 'status', 'owners'],
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
