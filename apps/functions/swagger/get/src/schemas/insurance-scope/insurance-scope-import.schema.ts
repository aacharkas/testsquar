import { OpenAPIV3 } from 'openapi-types';

import { FunctionSchema } from '../../types/function-schema';

import HttpMethods = OpenAPIV3.HttpMethods;

export const insuranceScopeImportSchema: FunctionSchema = {
  path: {
    route: '/api/insurance-scope/import',
    method: HttpMethods.POST,
    value: {
      summary: 'Import an insurance scope',
      tags: ['Insurance Scope'],
      security: [{ CookieAuth: [] }, { JWTAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/ImportInsuranceScope',
      },
      responses: {
        '200': {
          $ref: '#/components/responses/InsuranceScopeImportOk',
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
        '409': {
          $ref: '#/components/responses/ConflictError',
        },
        '500': {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
  components: {
    requestBodies: {
      ImportInsuranceScope: {
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
              },
              required: ['objectId'],
            },
          },
        },
      },
    },
    responses: {
      InsuranceScopeImportOk: {
        description: 'Insurance scope was successfully imported',
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
