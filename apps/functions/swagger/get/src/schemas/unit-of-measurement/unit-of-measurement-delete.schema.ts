import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const unitOfMeasurementDeleteSchema: FunctionSchema = {
  path: {
    route: '/api/unit-of-measurement/{id}',
    method: HttpMethods.DELETE,
    value: {
      tags: ['Unit of measurement'],
      summary: 'Delete unit-of-measurement by id',
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
        '204': {
          $ref: '#/components/responses/UnitOfMeasurementDeleteNoContent',
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
      UnitOfMeasurementDeleteNoContent: {
        description: 'UnitOfMeasurement was successfully deleted',
      },
    },
  },
};
