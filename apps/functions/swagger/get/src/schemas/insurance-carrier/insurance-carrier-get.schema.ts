import { OpenAPIV3 } from 'openapi-types';

import { TECH_STATUS } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceCarrierGetSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-carrier/{id}',
    method: HttpMethods.GET,
    value: {
      tags: ['Insurance Carrier'],
      summary: 'Get insurance carrier',
      description: 'Get insurance-carrier by id',
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
  components: {
    responses: {
      GetInsuranceCarrierOk: {
        description: 'InsuranceCarrier found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceCarrierWithMeta',
            },
          },
        },
      },
    },
    schemas: {
      InsuranceCarrierWithMeta: {
        allOf: [
          {
            $ref: '#/components/schemas/InsuranceCarrier',
          },
          {
            type: 'object',
            properties: {
              addressId: {
                type: 'string',
                format: 'uuid',
                example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb629',
              },
              address: {
                $ref: '#/components/schemas/CreateAddressBody',
              },
              fax: {
                type: 'string',
                example: '+375297364834',
              },
              techStatus: {
                type: 'string',
                enum: Object.values(TECH_STATUS),
              },
            },
            required: ['addressId', 'address', 'fax', 'techStatus'],
          },
        ],
      },
    },
  },
};
