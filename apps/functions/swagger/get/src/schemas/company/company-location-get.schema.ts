import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyLocationGetSchema: FunctionSchema = {
  path: {
    route: '/api/company/location/{id}',
    method: HttpMethods.GET,
    value: {
      tags: ['Company'],
      summary: 'Get company location by id',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      parameters: [
        {
          name: 'id',
          description: 'Company location id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/GetCompanyLocationOk',
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
      GetCompanyLocationOk: {
        description: 'Successfully found company location with given id',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompanyLocation',
            },
          },
        },
      },
    },
  },
};
