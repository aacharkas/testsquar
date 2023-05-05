import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const unitOfMeasurementCreateSchema: FunctionSchema = {
  path: {
    route: '/api/unit-of-measurement',
    method: HttpMethods.POST,
    value: {
      tags: ['Unit of measurement'],
      summary: 'Create a unit-of-measurement',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/CreateUnitOfMeasurement',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/CreateUnitOfMeasurementCreated',
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
      CreateUnitOfMeasurement: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 100,
                  example: 'Box',
                },
                abbreviation: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 5,
                  example: 'BX',
                },
              },
              required: ['name', 'abbreviation'],
            },
          },
        },
      },
    },
    responses: {
      CreateUnitOfMeasurementCreated: {
        description: 'Successfully created a unit-of-measurement',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UnitOfMeasurement',
            },
          },
        },
      },
    },
    schemas: {
      UnitOfMeasurement: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '35fc445f-58e2-4a89-b2e9-f4a9e94eb628',
          },
          name: {
            type: 'string',
            example: 'Box',
          },
          abbreviation: {
            type: 'string',
            example: 'BX',
          },
          createdAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
        },
        required: ['id', 'name', 'abbreviation', 'updatedAt', 'createdAt'],
      },
    },
  },
};
