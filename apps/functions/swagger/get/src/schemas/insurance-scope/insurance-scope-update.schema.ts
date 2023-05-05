import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{id}',
    method: HttpMethods.PUT,
    value: {
      summary: 'Update details of insurance scope',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'Insurance scope id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateInsuranceScopeBody',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateInsuranceScopesOk',
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
      UpdateInsuranceScopeBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                typeOfLoss: {
                  type: 'string',
                  example: 'Hail',
                  nullable: true,
                },
                claimNumber: {
                  type: 'string',
                  example: '4315S224R',
                  nullable: true,
                },
                dateOfLoss: {
                  type: 'string',
                  format: 'date',
                  example: '05/05/2020',
                  nullable: true,
                },
                dateInspected: {
                  type: 'string',
                  format: 'date',
                  example: '05/05/2020',
                  nullable: true,
                },
                dateContacted: {
                  type: 'string',
                  format: 'date',
                  example: '05/05/2020',
                  nullable: true,
                },
                dateReceived: {
                  type: 'string',
                  format: 'date',
                  example: '05/05/2020',
                  nullable: true,
                },
                dateEntered: {
                  type: 'string',
                  format: 'date',
                  example: '05/05/2020',
                  nullable: true,
                },
                policyNumber: {
                  type: 'string',
                  example: '4315S224R',
                  nullable: true,
                },
                priceList: {
                  type: 'string',
                  example: '4315S224R',
                  nullable: true,
                },
                totalLineItems: {
                  type: 'number',
                  example: 137.54,
                },
                totalTax: {
                  type: 'number',
                  example: 137.54,
                },
                totalRcv: {
                  type: 'number',
                  example: 137.54,
                },
                totalAcv: {
                  type: 'number',
                  example: 137.54,
                },
                totalOverhead: {
                  type: 'number',
                  example: 137.54,
                },
                totalDepreciation: {
                  type: 'number',
                  example: 137.54,
                },
                deductible: {
                  type: 'number',
                  example: 137.54,
                },
                netClaimSum: {
                  type: 'number',
                  example: 137.54,
                },
                totalRecoverableDepreciationSum: {
                  type: 'number',
                  example: 137.54,
                },
                totalNonRecoverableDepreciationSum: {
                  type: 'number',
                  example: 137.54,
                },
                netClaimIfDepreciationIsRecovered: {
                  type: 'number',
                  example: 137.54,
                },
              },
            },
          },
        },
      },
    },
    responses: {
      UpdateInsuranceScopesOk: {
        description: 'Successfully updated imported insurance-scope',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceScope',
            },
          },
        },
      },
    },
    schemas: {
      InsuranceScope: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          typeOfLoss: {
            type: 'string',
            example: 'Hail',
            nullable: true,
          },
          claimNumber: {
            type: 'string',
            example: '4315S224R',
            nullable: true,
          },
          dateOfLoss: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
            nullable: true,
          },
          dateInspected: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
            nullable: true,
          },
          dateContacted: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
            nullable: true,
          },
          dateReceived: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
            nullable: true,
          },
          dateEntered: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
            nullable: true,
          },
          policyNumber: {
            type: 'string',
            example: '4315S224R',
            nullable: true,
          },
          priceList: {
            type: 'string',
            example: '4315S224R',
            nullable: true,
          },
          status: {
            type: 'string',
            enum: ['IMPORTED'],
          },
          initialDocumentId: {
            type: 'string',
            format: 'uuid',
          },
          initialDocumentLink: {
            type: 'string',
          },
          total: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          totalRcv: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          totalOverhead: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          totalDepreciation: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          deductible: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          totalAcv: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          netClaimSum: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          totalRecoverableDepreciationSum: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          totalNonRecoverableDepreciationSum: {
            type: 'number',
            example: 137.54,
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },
};
