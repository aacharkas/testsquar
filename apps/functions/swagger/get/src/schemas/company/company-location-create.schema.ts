import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const companyLocationCreateSchema: FunctionSchema = {
  path: {
    route: '/api/company/location',
    method: HttpMethods.POST,
    value: {
      tags: ['Company'],
      summary: 'Create location',
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/CreateCompanyLocation',
      },
      responses: {
        '201': {
          $ref: '#/components/responses/CompanyLocationCreated',
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
      CreateCompanyLocation: {
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
                  $ref: '#/components/schemas/CreateAddressBody',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  minLength: 5,
                  maxLength: 254,
                },
                isMain: {
                  type: 'boolean',
                },
              },
              required: ['name', 'phone', 'address', 'email'],
            },
          },
        },
      },
    },
    responses: {
      CompanyLocationCreated: {
        description: 'Successfully created company location',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  $ref: '#/components/schemas/CompanyLocation',
                },
                {
                  type: 'object',
                  properties: {
                    address: {
                      $ref: '#/components/schemas/Address',
                    },
                  },
                  required: ['address'],
                },
              ],
            },
          },
        },
      },
    },
    schemas: {
      CreateAddressBody: {
        type: 'object',
        properties: {
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
            format: 'zip-code',
            example: '94105',
          },
          streetAddress1: {
            type: 'string',
            format: 'address',
            example: '425 Market St',
          },
          streetAddress2: {
            type: 'string',
            example: 'SUITE A-D',
            nullable: true,
          },
          apartment: {
            type: 'string',
            example: '14a',
            nullable: true,
          },
          latitude: {
            type: 'number',
            example: 37.79143580568487,
          },
          longitude: {
            type: 'number',
            example: -122.39820925272389,
          },
          placeId: {
            type: 'string',
          },
          formattedAddress: {
            type: 'string',
          },
        },
        required: [
          'country',
          'state',
          'city',
          'zipCode',
          'streetAddress1',
          'latitude',
          'longitude',
          'placeId',
          'formattedAddress',
        ],
      },
    },
  },
};
