import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const unitOfMeasurementUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/unit-of-measurement/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['Unit of measurement'],
      summary: 'Update unit-of-measurement by id',
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
      requestBody: {
        $ref: '#/components/requestBodies/CreateUnitOfMeasurement',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateUnitOfMeasurementOk',
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
    responses: {
      UpdateUnitOfMeasurementOk: {
        description: 'Successfully updated unit-of-measurement',
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
