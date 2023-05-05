import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const claimItemCreateSchema: FunctionSchema = {
  path: {
    route: '/api/claim-item',
    method: HttpMethods.POST,
    value: {
      tags: ['Claim Item'],
      summary: 'Create Claim Item',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/ClaimItemCreate',
      },
      responses: {
        '201': {
          $ref: '#/components/responsesClaimItemCreated',
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
    schemas: {
      ClaimItem: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          description: {
            type: 'string',
          },
          source: {
            type: 'string',
            enum: ['XACTIMATE', 'SYMBILITY', 'OTHER'],
          },
          techStatus: {
            type: 'string',
            enum: ['INACTIVE', 'ACTIVE', 'DELETED'],
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: [
          'id',
          'description',
          'source',
          'techStatus',
          'createdAt',
          'updatedAt',
        ],
      },
    },
    requestBodies: {
      ClaimItemCreate: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                },
                source: {
                  type: 'string',
                  enum: ['XACTIMATE', 'SYMBILITY', 'OTHER'],
                },
              },
              required: ['description', 'source'],
            },
          },
        },
      },
    },
    responses: {
      ClaimItemCreated: {
        description: 'Successfully created Claim Item',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ClaimItem',
            },
          },
        },
      },
    },
  },
};
