import { OpenAPIV3 } from 'openapi-types';

import { COMPANY_STATUS } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyStatusUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/company/{id}/status',
    method: HttpMethods.PATCH,
    value: {
      tags: ['Company'],
      summary: 'Update company status by id',
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
        $ref: '#/components/requestBodies/UpdateCompanyStatus',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateCompanyStatusOk',
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
      UpdateCompanyStatus: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: [COMPANY_STATUS.ACTIVE, COMPANY_STATUS.INACTIVE],
                },
              },
            },
          },
        },
      },
    },
    responses: {
      UpdateCompanyStatusOk: {
        description: 'Successfully updated company status',
      },
    },
  },
};
