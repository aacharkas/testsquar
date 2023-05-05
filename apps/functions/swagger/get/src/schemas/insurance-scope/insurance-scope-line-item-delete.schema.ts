import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeLineItemDeleteSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{scopeId}/groups/{groupId}/items/{id}',
    method: HttpMethods.DELETE,
    value: {
      summary: 'Delete an insurance scope line item',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'scopeId',
          description: 'Insurance scope id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'groupId',
          description: 'Insurance scope group id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'id',
          description: 'Insurance scope line item id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '204': {
          $ref: '#/components/responses/InsuranceScopeLineItemDeleteNoContent',
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
      InsuranceScopeLineItemDeleteNoContent: {
        description: 'Insurance scope line item was successfully deleted',
      },
    },
  },
};
