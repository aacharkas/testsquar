import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeSaveSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/save',
    method: HttpMethods.POST,
    value: {
      summary: 'Save an insurance scope',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/SaveInsuranceScope',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/InsuranceScopeSaveOk',
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
      SaveInsuranceScope: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                objectId: {
                  type: 'string',
                  example: 'someFile.pdf',
                },
                initialDocumentName: {
                  type: 'string',
                  example: 'someFile.pdf',
                },
                mode: {
                  type: 'string',
                  enum: ['NEW', 'NEW_VERSION'],
                  example: 'NEW_VERSION',
                },
              },

              required: ['objectId'],
            },
          },
        },
      },
    },
    responses: {
      InsuranceScopeSaveOk: {
        description: 'Insurance scope was successfully saved',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsuranceScopeListItem',
            },
          },
        },
      },
    },
  },
};
