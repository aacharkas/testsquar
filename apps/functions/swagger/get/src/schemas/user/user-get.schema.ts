import { OpenAPIV3 } from 'openapi-types';

import { USER_ROLE } from '@squaredash/shared/constants';
import { TECH_STATUS } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const userGetSchema: FunctionSchema = {
  path: {
    route: '/api/user',
    method: HttpMethods.GET,
    value: {
      tags: ['User'],
      summary: 'Get current user',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      responses: {
        '200': {
          $ref: '#/components/responses/GetUserOk',
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
      GetUserOk: {
        description: 'Successfully found user',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  $ref: '#/components/schemas/User',
                },
                {
                  type: 'object',
                  properties: {
                    permissions: {
                      type: 'object',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    schemas: {
      User: {
        type: 'object',
        nullable: true,
        properties: {
          id: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          name: {
            type: 'string',
          },
          phone: {
            type: 'string',
            nullable: true,
          },
          birthDate: {
            type: 'string',
            format: 'date',
            nullable: true,
          },
          timezone: {
            type: 'string',
          },
          tShirtSize: {
            type: 'string',
            nullable: true,
            enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          },
          isVerified: {
            type: 'boolean',
          },
          role: {
            type: 'string',
            enum: Object.values(USER_ROLE),
          },
          companyId: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
          addressId: {
            type: 'string',
            nullable: true,
          },
          techStatus: {
            type: 'string',
            enum: Object.values(TECH_STATUS),
          },
        },
      },
    },
  },
};
