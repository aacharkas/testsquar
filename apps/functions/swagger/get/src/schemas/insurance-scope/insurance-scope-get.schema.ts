import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeGetSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/{id}',
    method: HttpMethods.GET,
    value: {
      summary: 'Get details of insurance scope',
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
        description: 'Successfully fetched imported insurance-scope',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceScopeDetails',
            },
          },
        },
      },
    },
    schemas: {
      InsuranceScopeDetails: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          typeOfLoss: {
            type: 'string',
            example: 'Hail',
          },
          claimNumber: {
            type: 'string',
            example: '4315S224R',
          },
          dateOfLoss: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
          },
          dateInspected: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
          },
          dateContacted: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
          },
          dateReceived: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
          },
          dateEntered: {
            type: 'string',
            format: 'date',
            example: '05/05/2020',
          },
          policyNumber: {
            type: 'string',
            example: '4315S224R',
          },
          priceList: {
            type: 'string',
            example: '4315S224R',
          },
          status: {
            type: 'string',
            enum: ['IMPORTED'],
          },
          initialDocumentId: {
            type: 'string',
            format: 'uuid',
          },
          initialDocumentName: {
            type: 'string',
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
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
          customer: {
            $ref: '#/components/schemas/CustomerDraft',
          },
          insuranceCarrier: {
            $ref: '#/components/schemas/InsuranceCarrierDraft',
          },
          groups: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/InsuranceScopeGroupDraft',
            },
          },
        },
      },
      InsuranceCarrierAdjusterDraft: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          type: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          address: {
            type: 'string',
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
      InsuranceCarrierDraft: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          fax: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          insuranceCarrierId: {
            type: 'string',
          },
          adjusters: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/InsuranceCarrierAdjusterDraft',
            },
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
      CustomerDraft: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          displayName: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          propertyAddress: {
            type: 'string',
          },
          shippingAddress: {
            type: 'string',
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
      InsuranceScopeGroupDraft: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
          },
          notes: {
            type: 'string',
          },
          totalTax: {
            type: 'number',
            example: 137.54,
          },
          totalRCV: {
            type: 'number',
            example: 137.54,
          },
          totalACV: {
            type: 'number',
            example: 137.54,
          },
          depreciation: {
            type: 'number',
            example: 137.54,
          },
          overhead: {
            type: 'number',
            example: 137.54,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
          groups: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/InsuranceScopeGroupDraft',
            },
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/InsuranceScopeLineItemDraft',
            },
          },
        },
      },
      InsuranceScopeLineItemDraft: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          description: {
            type: 'string',
          },
          sequence: {
            type: 'number',
          },
          notes: {
            type: 'string',
          },
          quantity: {
            type: 'number',
            example: 137.54,
          },
          unitOfMeasurement: {
            type: 'string',
          },
          unitPrice: {
            type: 'number',
            example: 137.54,
          },
          tax: {
            type: 'number',
            example: 137.54,
          },
          overhead: {
            type: 'number',
            example: 137.54,
          },
          rcv: {
            type: 'number',
            example: 137.54,
          },
          acv: {
            type: 'number',
            example: 137.54,
          },
          ageLife: {
            type: 'string',
          },
          condition: {
            type: 'string',
          },
          depreciationPercentage: {
            type: 'number',
            example: 13.33,
          },
          depreciationSum: {
            type: 'number',
            example: 137.54,
          },
          isDepreciationRefundable: {
            type: 'boolean',
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
