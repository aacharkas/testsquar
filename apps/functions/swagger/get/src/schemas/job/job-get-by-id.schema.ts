import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const jobGetByIdSchema: FunctionSchema = {
  path: {
    route: '/api/job/{id}',
    method: HttpMethods.GET,
    value: {
      summary: 'Get job by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      tags: ['Job'],
      parameters: [
        {
          name: 'id',
          description: 'ID of job',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Job has been found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobWithMeta',
              },
            },
          },
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
    schemas: {
      JobWithMeta: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          claimNumber: {
            type: 'string',
          },
          typeOfLoss: {
            type: 'string',
          },
          dateOfLoss: {
            type: 'string',
          },
          policyNumber: {
            type: 'string',
          },
          priceList: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
          },
          techStatus: {
            type: 'string',
          },
          versionStatus: {
            type: 'string',
          },
          insuranceCarrier: {
            $ref: '#/components/schemas/JobInsuranceCarrierInfo',
          },
          groups: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/JobGroupInfo',
            },
          },
          customer: {
            $ref: '#/components/schemas/JobCustomerInfo',
          },
          totals: {
            $ref: '#/components/schemas/JobTotals',
          },
        },
      },
      JobCustomerInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          propertyAddress: {
            $ref: '#/components/schemas/Address',
          },
          customerId: {
            type: 'string',
          },
          jobId: {
            type: 'string',
          },
        },
      },
      JobInsuranceCarrierInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          insuranceCarrierId: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phoneNumber: {
            type: 'string',
          },
          jobId: {
            type: 'string',
          },
          adjusters: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/JobAdjusterInfo',
            },
          },
        },
      },
      JobAdjusterInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
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
          phoneNumber: {
            type: 'string',
          },
          jobInsuranceCarrierId: {
            type: 'string',
          },
          jobId: {
            type: 'string',
          },
        },
      },
      JobGroupInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          notes: {
            type: 'string',
          },
          totalTax: {
            type: 'string',
          },
          totalOverheadAndProfit: {
            type: 'string',
          },
          totalRCV: {
            type: 'string',
          },
          totalACV: {
            type: 'string',
          },
          totalDepreciationSum: {
            type: 'string',
          },
          jobId: {
            type: 'string',
          },
          parentId: {
            type: 'string',
          },
          lineItems: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/JobLineItem',
            },
          },
        },
      },
      JobLineItem: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          sequenceNumber: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          notes: {
            type: 'string',
          },
          quantity: {
            type: 'number',
          },
          unitOfMeasurement: {
            $ref: '#/components/schemas/UnitOfMeasurement',
          },
          unitPrice: {
            type: 'number',
          },
          tax: {
            type: 'number',
          },
          overheadAndProfit: {
            type: 'number',
          },
          rcv: {
            type: 'number',
          },
          acv: {
            type: 'number',
          },
          depreciation: {
            type: 'number',
          },
          depreciationSum: {
            type: 'number',
          },
          isDepreciationRecoverable: {
            type: 'boolean',
          },
          includedInJob: {
            type: 'boolean',
          },
          groupId: {
            type: 'string',
          },
          jobId: {
            type: 'string',
          },
        },
      },
      JobTotals: {
        type: 'object',
        properties: {
          lineItemsTotal: {
            type: 'number',
          },
          totalTax: {
            type: 'number',
          },
          totalRCV: {
            type: 'number',
          },
          totalOverheadAndProfit: {
            type: 'number',
          },
          totalDepreciationSum: {
            type: 'number',
          },
          deductible: {
            type: 'number',
          },
          totalACV: {
            type: 'number',
          },
          netClaimItem: {
            type: 'number',
          },
          totalRecoverableDepreciationSum: {
            type: 'number',
          },
          totalNonRecoverableDepreciationSum: {
            type: 'number',
          },
          netClaimIfDepreciationIsRecovered: {
            type: 'number',
          },
        },
        required: [
          'lineItemsTotal',
          'totalTax',
          'totalRCV',
          'totalOverheadAndProfit',
          'totalDepreciationSum',
          'deductible',
          'totalACV',
          'netClaimItem',
          'totalRecoverableDepreciationSum',
          'totalNonRecoverableDepreciationSum',
          'netClaimIfDepreciationIsRecovered',
        ],
      },
    },
  },
};
