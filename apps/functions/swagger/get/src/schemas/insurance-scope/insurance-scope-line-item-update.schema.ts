import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeLineItemUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{scopeId}/groups/{groupId}/items/{id}',
    method: HttpMethods.PUT,
    value: {
      summary: 'Create an insurance scope line item',
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
      requestBody: {
        $ref: '#/components/requestBodies/CreateInsuranceScopeLineItem',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/InsuranceScopeLineItemUpdateOk',
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
      InsuranceScopeLineItemUpdateOk: {
        description: 'Insurance scope line item was successfully updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceScopeLineItemDraft',
            },
          },
        },
      },
    },
  },
};
