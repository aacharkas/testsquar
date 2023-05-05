import { HTTP_STATUS } from './consts';

export class HttpException extends Error {
  constructor(public statusCode: number, message: string, params = {}) {
    super(message);
    Object.setPrototypeOf(this, HttpException.prototype);
    Object.assign(this, { params });
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.BAD_REQUEST, message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.FORBIDDEN, message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string | undefined = 'IM0053') {
    super(HTTP_STATUS.NOT_FOUND, message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, params: Record<string, unknown>) {
    super(HTTP_STATUS.CONFLICT, message, params);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}
