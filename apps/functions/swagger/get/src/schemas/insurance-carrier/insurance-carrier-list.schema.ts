import { OpenAPIV3 } from 'openapi-types';

import { SORT_ORDER } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceCarrierListSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-carrier/list',
    method: HttpMethods.GET,
    value: {
      tags: ['Insurance Carrier'],
      summary: 'Get list of insurance-carriers',
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
            enum: ['name'],
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetInsuranceCarriersOk',
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
      GetInsuranceCarriersOk: {
        description: 'Successfully fetched list of insurance-carriers',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/InsuranceCarrier',
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
