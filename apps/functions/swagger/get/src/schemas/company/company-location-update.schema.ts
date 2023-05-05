import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyLocationUpdateSchema: FunctionSchema = {
  path: {
    route: '/api/company/location/{id}',
    method: HttpMethods.PUT,
    value: {
      tags: ['Company'],
      summary: 'Update company location by id',
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
      requestBody: {
        $ref: '#/components/requestBodies/UpdateCompanyLocation',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/UpdateCompanyLocationOk',
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
      UpdateCompanyLocation: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 100,
                },
                phone: {
                  type: 'string',
                  format: 'phone-number',
                },
                address: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    country: {
                      type: 'string',
                    },
                    state: {
                      type: 'string',
                    },
                    city: {
                      type: 'string',
                    },
                    zipCode: {
                      type: 'string',
                    },
                    streetAddress1: {
                      type: 'string',
                    },
                    streetAddress2: {
                      type: 'string',
                      nullable: true,
                    },
                    apartment: {
                      type: 'string',
                      nullable: true,
                    },
                    latitude: {
                      type: 'string',
                    },
                    longitude: {
                      type: 'string',
                    },
                  },
                  required: [
                    'id',
                    'country',
                    'state',
                    'city',
                    'zipCode',
                    'streetAddress1',
                    'latitude',
                    'longitude',
                  ],
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
                isMain: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      UpdateCompanyLocationOk: {
        description: 'Successfully updated company location',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompanyLocation',
            },
          },
        },
      },
    },
    schemas: {
      CompanyLocation: {
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
            format: 'phone-number',
          },
          email: {
            type: 'string',
            format: 'email',
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
        required: [
          'id',
          'name',
          'phone',
          'email',
          'isMain',
          'companyId',
          'addressId',
        ],
      },
      Address: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          country: {
            type: 'string',
            example: 'USA',
          },
          state: {
            type: 'string',
            example: 'California',
          },
          city: {
            type: 'string',
            example: 'San Francisco',
          },
          zipCode: {
            type: 'string',
            example: '90210',
          },
          streetAddress1: {
            type: 'string',
            example: '520 Market St',
          },
          streetAddress2: {
            type: 'string',
            nullable: true,
            example: 'SUITE A-D',
          },
          latitude: {
            type: 'number',
            example: 37.79143580568487,
          },
          longitude: {
            type: 'number',
            example: -122.39820925272389,
          },
        },
        required: [
          'id',
          'country',
          'state',
          'city',
          'zipCode',
          'streetAddress1',
          'streetAddress2',
          'latitude',
          'longitude',
        ],
      },
    },
  },
};
