import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const claimItemListSchema: FunctionSchema = {
  path: {
    route: '/api/claim-item',
    method: HttpMethods.GET,
    value: {
      tags: ['Claim Item'],
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
          name: 'sources',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
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
          name: 'reviewed',
          in: 'query',
          required: false,
          schema: {
            type: 'boolean',
          },
        },
        {
          name: 'sortOrder',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
          },
        },
      ],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      responses: {
        '200': {
          $ref: '#/components/responses/GetClaimItemListOk',
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
      GetClaimItemListOk: {
        description: 'Successfully fetched list of Claim Items',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ClaimItem',
                  },
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
