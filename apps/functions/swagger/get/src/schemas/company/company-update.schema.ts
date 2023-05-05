import { OpenAPIV3 } from 'openapi-types';

import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';
import { TECH_STATUS } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/company/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['Company'],
      summary: 'Update company by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'Company id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateCompany',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateCompanyOk',
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
    requestBodies: {
      UpdateCompany: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Company Name',
                },
                legalName: {
                  type: 'string',
                  example: 'Company Legal Name',
                },
                avatarId: {
                  type: 'string',
                  format: 'uuid',
                  example: '091450b2-9cb1-4f5e-b0fb-8fd9c43730eb',
                },
                numberOfEmployees: {
                  type: 'string',
                  enum: Object.values(NUMBER_OF_EMPLOYEES),
                  example: '25+',
                },
                numberOfInsuranceJobsPerMonth: {
                  type: 'string',
                  enum: Object.values(NUMBER_OF_INSURANCE_JOBS_PER_MONTH),
                  example: '500+',
                },
                comeFrom: {
                  type: 'string',
                  enum: Object.values(COME_FROM),
                  example: 'Google or other web search',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      UpdateCompanyOk: {
        description: 'Successfully updated company',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompanyWithMeta',
            },
          },
        },
      },
    },
    schemas: {
      CompanyWithMeta: {
        allOf: [
          {
            $ref: '#/components/schemas/Company',
          },
          {
            type: 'object',
            properties: {
              numberOfEmployees: {
                type: 'string',
                enum: Object.values(NUMBER_OF_EMPLOYEES),
              },
              numberOfInsuranceJobsPerMonth: {
                type: 'string',
                enum: Object.values(NUMBER_OF_EMPLOYEES),
              },
              comeFrom: {
                type: 'string',
                enum: Object.values(COME_FROM),
              },
              locations: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/CompanyLocation',
                },
              },
              status: {
                type: 'string',
                enum: Object.values(TECH_STATUS),
              },
              avatar: {
                type: 'string',
                format: 'url',
                example:
                  'https://dev-squaredash-public.s3.amazonaws.com/company-avatar/091450b2-9cb1-4f5e-b0fb-8fd9c43730eb',
              },
            },
            required: [
              'numberOfEmployees',
              'numberOfInsuranceJobsPetMonth',
              'comeFrom',
              'locations',
              'status',
              'avatarId',
            ],
          },
        ],
      },
    },
  },
};
