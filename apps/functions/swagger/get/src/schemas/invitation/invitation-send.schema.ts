import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const invitationSendSchema: FunctionSchema = {
  path: {
    route: '/api/invitation',
    method: HttpMethods.POST,
    value: {
      summary: 'Receive invitation',
      tags: ['Invitation'],
      requestBody: {
        $ref: '#/components/requestBodies/InvitationSend',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/SendInvitationOk',
        },
        '400': {
          $ref: '#/components/responses/ValidationError',
        },
        '401': {
          $ref: '#/components/responses/UnauthorizedError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    schemas: {
      SendInvitation: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          name: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
          phone: {
            type: 'string',
            format: 'phone',
          },
          address: {
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
          birthDate: {
            type: 'string',
            format: 'date-time',
          },
          tShirtSize: {
            type: 'string',
            enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          },
          timezone: {
            type: 'string',
            format: 'timezone',
          },
        },
        required: ['email', 'role', 'name'],
      },
      InviteSuperAdmin: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          name: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
          avatarId: {
            type: 'string',
            format: 'uuid',
          },
          timezone: {
            type: 'string',
            format: 'timezone',
          },
        },
        required: ['email, name, role'],
      },
    },
    requestBodies: {
      InvitationSend: {
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  $ref: '#/components/schemas/SendInvitation',
                },
                {
                  $ref: '#/components/schemas/InviteSuperAdmin',
                },
              ],
            },
          },
        },
      },
    },
    responses: {
      SendInvitationOk: {
        description: 'Successfully sent invitation',
      },
    },
  },
};
