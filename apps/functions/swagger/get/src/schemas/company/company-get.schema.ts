import { OpenAPIV3 } from 'openapi-types';

import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';
import { TECH_STATUS } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyGetSchema: FunctionSchema = {
  path: {
    route: '/api/company/{id}',
    method: HttpMethods.GET,
    value: {
      tags: ['Company'],
      summary: 'Get company',
      description: 'Get company by id',
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
      responses: {
        '200': {
          $ref: '#/components/responses/GetCompanyOk',
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
      GetCompanyOk: {
        description: 'Company found',
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  $ref: '#/components/schemas/CompanyWithMetaOwner',
                },
                {
                  $ref: '#/components/schemas/CompanyWithMetaAdmin',
                },
              ],
            },
          },
        },
      },
    },
    schemas: {
      CompanyWithMetaAdmin: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          locations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                name: {
                  type: 'string',
                },
                phone: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                isMain: {
                  type: 'boolean',
                },
                companyId: {
                  type: 'string',
                },
                addressId: {
                  type: 'string',
                },
              },
            },
          },
          owners: {
            $ref: '#/components/schemas/OwnersList',
          },
          status: {
            type: 'string',
            enum: Object.values(TECH_STATUS),
            example: 'DELETED',
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
          },
          avatar: {
            type: 'string',
            format: 'url',
            example:
              'https://dev-squaredash-public.s3.amazonaws.com/company-avatar/091450b2-9cb1-4f5e-b0fb-8fd9c43730eb',
            nullable: true,
          },
        },
        required: ['id', 'name', 'locations', 'owners', 'avatarId'],
      },
      CompanyWithMetaOwner: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          locations: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/CompanyLocation',
            },
          },
          owners: {
            $ref: '#/components/schemas/OwnersList',
          },
          avatarId: {
            type: 'string',
            format: 'url',
            example:
              'https://dev-squaredash-public.s3.amazonaws.com/company-avatar/091450b2-9cb1-4f5e-b0fb-8fd9c43730eb',
            nullable: true,
          },
        },
        required: ['id', 'name', 'locations', 'owners', 'avatarId'],
      },
    },
  },
};
