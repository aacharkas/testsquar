import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { NotFoundException } from '@squaredash/shared/util';

const lambda = () => {
  throw new NotFoundException('Route not found');
};

exports.handler = errorHandlerMiddleware(lambda);
