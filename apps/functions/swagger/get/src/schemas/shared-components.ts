import { OpenAPIV3 } from 'openapi-types';

import ComponentsObject = OpenAPIV3.ComponentsObject;

export const sharedComponents: ComponentsObject = {
  responses: {
    ValidationError: {
      description: 'Validation of a request failed.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'ValidationError',
              },
              errors: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    property: {
                      type: 'string',
                    },
                    value: {},
                    constraints: {
                      type: 'object',
                    },
                    contexts: {
                      type: 'object',
                    },
                  },
                  required: ['property'],
                },
              },
            },
            required: ['message', 'errors'],
          },
        },
      },
    },
    InternalServerError: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
            required: ['message'],
          },
        },
      },
    },
    UnauthorizedError: {
      description: 'Unauthorized Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
            required: ['message'],
          },
        },
      },
    },
    ForbiddenError: {
      description: 'Forbidden Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
            required: ['message'],
          },
        },
      },
    },
    ConflictError: {
      description: 'Conflict Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              params: {
                type: 'object',
              },
            },
            required: ['message'],
          },
        },
      },
    },
    NotFoundError: {
      description: 'Resource Not Found Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
            required: ['message'],
          },
        },
      },
    },
  },
  securitySchemes: {
    CookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
    },
    JWTAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
};
