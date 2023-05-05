import { OpenAPIV3 } from 'openapi-types';

import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyInviteSchema: FunctionSchema = {
  path: {
    route: '/api/company/invite',
    method: HttpMethods.POST,
    value: {
      tags: ['Company'],
      summary: 'Create a company',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/InviteCompany',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/CreateCompanyCreated',
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
      InviteCompany: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 200,
                  example: 'Google',
                },
                ownerName: {
                  type: 'string',
                  example: 'name',
                },
                ownerEmail: {
                  type: 'string',
                  example: 'someemail@gmail.com',
                },
                avatarId: {
                  type: 'string',
                  format: 'uuid',
                },
                legalName: {
                  type: 'string',
                  example: 'Company Legal Name',
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
              required: [
                'name',
                'numberOfEmployees',
                'numberOfInsuranceJobsPerMonth',
                'comeFrom',
              ],
            },
          },
        },
      },
    },
  },
};
