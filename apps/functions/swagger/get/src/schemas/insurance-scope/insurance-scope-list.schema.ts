import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeListSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope',
    method: HttpMethods.GET,
    value: {
      summary: 'List of imported insurance scope',
      tags: ['Insurance Scope'],
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
          name: 'customerIds',
          in: 'query',
          required: false,
          schema: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        {
          name: 'insuranceCarrierIds',
          in: 'query',
          required: false,
          schema: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        {
          name: 'dateOfLossFrom',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'dateOfLossTo',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'rcvFrom',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'rcvTo',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
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
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetInsuranceScopesOk',
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
      GetInsuranceScopesOk: {
        description: 'Successfully fetched list of insurance-scopes',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/InsuranceScopeListItem',
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
    schemas: {
      InsuranceScopeListItem: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb628',
          },
          dateOfLoss: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
          },
          claimNumber: {
            type: 'string',
            example: '4315S224R',
          },
          customerName: {
            type: 'string',
            example: 'John Doe',
          },
          propertyAddress: {
            type: 'string',
          },
          insuranceCarrierName: {
            type: 'string',
            example: 'State Farm',
          },
          rcv: {
            type: 'number',
            example: 137.54,
          },
          deductible: {
            type: 'number',
            example: 435.16,
          },
          status: {
            type: 'string',
            enum: ['IMPORTED'],
          },
        },
        required: ['id', 'name', 'abbreviation', 'updatedAt', 'createdAt'],
      },
    },
  },
};
