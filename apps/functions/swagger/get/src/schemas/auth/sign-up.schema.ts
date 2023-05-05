import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const signUpSchema: FunctionSchema = {
  path: {
    route: '/api/auth/sign-up',
    method: HttpMethods.POST,
    value: {
      tags: ['Auth'],
      summary: 'Sign up',
      requestBody: {
        $ref: '#/components/requestBodies/SignUp',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/SignUpOk',
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    requestBodies: {
      SignUp: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  format: 'email',
                  type: 'string',
                  minLength: 5,
                  maxLength: 254,
                  example: 'john.doe@gmail.com',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  minLength: 8,
                  maxLength: 128,
                  example: 'johnDoe3478',
                },
                name: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 50,
                  example: 'Jonathan',
                },
                phone: {
                  type: 'string',
                  format: 'phone-number',
                  example: '+15851234567',
                },
                address: {
                  $ref: '#/components/schemas/SignUpAddressBody',
                },
                birthDate: {
                  type: 'string',
                  format: 'date',
                },
                tShirtSize: {
                  type: 'string',
                  enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                },
                timezone: {
                  type: 'string',
                  example: 'UTC',
                },
              },
              required: ['email', 'password', 'name'],
            },
          },
        },
      },
    },
    responses: {
      SignUpOk: {
        description:
          'Successfully signed up. The access token is returned in a cookie named access_token. You need to include this cookie in subsequent requests.',
        headers: {
          'Set-Cookie': {
            schema: {
              type: 'string',
            },
          },
        },
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    schemas: {
      SignUpAddressBody: {
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
