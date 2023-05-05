import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const invitationReceiveSchema: FunctionSchema = {
  path: {
    route: '/api/invitation',
    method: HttpMethods.GET,
    value: {
      summary: 'Receive invitation',
      tags: ['Invitation'],
      parameters: [
        {
          name: 'token',
          required: true,
          in: 'query',
          schema: {
            type: 'string',
          },
          description: 'Invitation token',
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/InvitationReceiveOk',
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
    responses: {
      InvitationReceiveOk: {
        description: 'Successfully received invitation',
        content: {
          'application/json': {
            schema: {
              type: 'string',
              enum: ['UPDATED', 'REDIRECT'],
            },
          },
        },
      },
    },
  },
};
