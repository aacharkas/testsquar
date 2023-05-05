import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const claimItemRemoveSchema: FunctionSchema = {
  path: {
    route: '/api/claim-item/{id}',
    method: HttpMethods.DELETE,
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
      responses: {
        '204': {
          $ref: '#/components/responses/ClaimItemDeleteNoContent',
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
      ClaimItemDeleteNoContent: {
        description: 'Customer was successfully deleted',
      },
    },
  },
};
