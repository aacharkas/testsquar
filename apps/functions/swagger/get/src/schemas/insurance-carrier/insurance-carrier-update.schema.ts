import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceCarrierUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-carrier/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['Insurance Carrier'],
      summary: 'Update insurance-carrier by id',
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
      requestBody: {
        $ref: '#/components/requestBodies/CreateInsuranceCarrier',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateInsuranceCarrierOk',
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
      UpdateInsuranceCarrierOk: {
        description: 'Successfully updated insurance-carrier',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceCarrier',
            },
          },
        },
      },
    },
  },
};
