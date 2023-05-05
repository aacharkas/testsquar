import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceCarrierGetByNameSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-carrier/name/{name}',
    method: HttpMethods.GET,
    value: {
      tags: ['Insurance Carrier'],
      summary: 'Get insurance carrier',
      description: 'Get insurance-carrier by name',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'name',
          description: 'InsuranceCarrier name',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetInsuranceCarrierOk',
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
  components: {},
};
