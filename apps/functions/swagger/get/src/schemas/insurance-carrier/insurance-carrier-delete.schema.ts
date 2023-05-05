import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceCarrierDeleteSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-carrier/{id}',
    method: HttpMethods.DELETE,
    value: {
      tags: ['Insurance Carrier'],
      summary: 'Delete insurance-carrier by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'InsuranceCarrier id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '204': {
          $ref: '#/components/responses/InsuranceCarrierDeleteNoContent',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '403': {
          $ref: '#/components/responses/ForbiddenError',
        },
        '404': {
          $ref: '#/components/responses/NotFoundError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    responses: {
      InsuranceCarrierDeleteNoContent: {
        description: 'InsuranceCarrier was successfully deleted',
      },
    },
  },
};
