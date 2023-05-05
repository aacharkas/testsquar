import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const claimItemUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/claim-item/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['Claim Item'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'Claim Item id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateClaimItem',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateClaimItemOk',
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
    requestBodies: {
      UpdateClaimItem: {
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
      UpdateClaimItemOk: {
        description: 'Successfully updated Claim Item',
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
