import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const unitOfMeasurementGetSchema: FunctionSchema = {
  path: {
    route: '/api/unit-of-measurement/{id}',
    method: HttpMethods.GET,
    value: {
      tags: ['Unit of measurement'],
      summary: 'Get unit-of-measurement',
      description: 'Get unit-of-measurement by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'UnitOfMeasurement id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetUnitOfMeasurementOk',
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
      GetUnitOfMeasurementOk: {
        description: 'UnitOfMeasurement found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UnitOfMeasurement',
            },
          },
        },
      },
    },
  },
};
