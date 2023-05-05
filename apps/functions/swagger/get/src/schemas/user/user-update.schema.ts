import { OpenAPIV3 } from 'openapi-types';

import { USER_ROLE } from '@squaredash/shared/constants';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const userUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/user/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['User'],
      summary: 'Update User by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'User id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateUser',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateUserOk',
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
      UpdateUser: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'User Name',
                },
                role: {
                  type: 'string',
                  enum: Object.values(USER_ROLE),
                },
                avatarId: {
                  type: 'string',
                  format: 'uuid',
                  example: '091450b2-9cb1-4f5e-b0fb-8fd9c43730eb',
                },
                phone: {
                  type: 'string',
                  format: 'phone-number',
                },
                birthDate: {
                  type: 'string',
                  format: 'date',
                },
                tShirtSize: {
                  type: 'string',
                  nullable: true,
                  enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                },
                timezone: {
                  type: 'string',
                  example: 'UTC',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      UpdateUserOk: {
        description: 'Successfully updated User',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
  },
};
