import { TokenType } from '@prisma/client';
import { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import { Callback } from 'aws-lambda/handler';

import * as tokenCrud from '@squaredash/crud/token';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  UnauthorizedException,
  extractToken,
  generateJwtToken,
  generateSetCookiesHeader,
  validateToken,
} from '@squaredash/shared/util';

const REFRESH_TOKEN_NAME = 'refresh_token';
const ACCESS_TOKEN_NAME = 'access_token';

interface AuthTokenPayload {
  userId: string;
  role: USER_ROLE;
  companyId: string;
  exp: number;
}

export const authGuard = (handler: Handler) => {
  return async (
    event: APIGatewayProxyEvent,
    context: CustomContext,
    callback: Callback<unknown>
  ) => {
    const refreshToken = extractToken(event, REFRESH_TOKEN_NAME);
    const accessToken = extractToken(event, ACCESS_TOKEN_NAME);
    if (!refreshToken || !accessToken) {
      throw new UnauthorizedException('Missing refresh or/and access tokens');
    }

    // validateTokens function will throw NotAuthenticatedError if token is not valid
    const [decodedRefreshToken, decodedAccessToken] = await validateTokens(
      refreshToken,
      accessToken
    );
    const isRefreshTokenExists = await tokenCrud.isTokenExists(
      refreshToken,
      TokenType.REFRESH
    );
    if (
      !isRefreshTokenExists ||
      decodedRefreshToken.userId !== decodedAccessToken.userId
    ) {
      await tokenCrud.deleteMany({
        token: refreshToken,
        type: TokenType.REFRESH,
      });
      throw new UnauthorizedException(
        "Refresh token doesn't exist in the database or refresh and access tokens mismatched"
      );
    }

    context.user = {
      id: decodedRefreshToken.userId,
      role: decodedRefreshToken.role,
      companyId: decodedRefreshToken.companyId || undefined,
    };
    delete decodedAccessToken.exp;

    const newAccessToken = generateJwtToken(
      decodedAccessToken as unknown as { [key: string]: unknown }
    );
    const setCookiesHeader = generateSetCookiesHeader({
      accessToken: newAccessToken,
      refreshToken,
    });

    const result = await handler(event, context, callback);

    return {
      multiValueHeaders: {
        'Set-Cookie': setCookiesHeader,
      },
      ...result,
    };
  };
};

async function validateTokens(refreshToken: string, accessToken: string) {
  try {
    return await Promise.all([
      validateToken<AuthTokenPayload>(refreshToken),
      validateToken<AuthTokenPayload>(accessToken),
    ]);
  } catch {
    throw new UnauthorizedException('Refresh and/or access tokens are invalid');
  }
}
