import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Callback } from 'aws-lambda/handler';
import { ValidationError } from 'class-validator';

import { HTTP_STATUS, Logger } from '@squaredash/shared/util';

const logger = new Logger('ErrorHandlerMiddleware');
const emptyBodyErrorMessage =
  'Incorrect object param type! Only string, plain object and array of plain objects are valid.';

const handleValidationError = (error: ValidationError) => {
  const errors = [];
  if (error.children && error.children.length) {
    for (const childError of error.children) {
      errors.push(...handleValidationError(childError));
    }
  } else {
    errors.push({ ...error, target: undefined, children: undefined });
  }
  return errors;
};

export const errorHandlerMiddleware = (handler: Handler) => {
  return async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback<unknown>
  ) => {
    try {
      return await handler(event, context, callback);
    } catch (error) {
      logger.error(error);
      if (error.message === emptyBodyErrorMessage) {
        const statusCode = HTTP_STATUS.BAD_REQUEST;
        return {
          statusCode,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ message: error.message }),
        };
      }
      if (error.length && error[0] instanceof ValidationError) {
        const errors = [];
        for (const validationError of error) {
          errors.push(...handleValidationError(validationError));
        }

        const statusCode = HTTP_STATUS.BAD_REQUEST;
        return {
          statusCode,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            message: 'ValidationError',
            errors,
          }),
        };
      } else {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        const params = error.params || {};

        return {
          statusCode,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ message, params }),
        };
      }
    }
  };
};
