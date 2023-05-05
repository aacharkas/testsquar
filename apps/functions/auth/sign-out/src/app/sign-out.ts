import { APIGatewayEvent } from 'aws-lambda';

import * as tokenCrud from '@squaredash/crud/token';
import {
  BadRequestException,
  extractToken,
  validateToken,
} from '@squaredash/shared/util';

const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';

export async function signOut(event: APIGatewayEvent): Promise<void> {
  const accessToken = extractToken(event, ACCESS_TOKEN_NAME);
  const refreshToken = extractToken(event, REFRESH_TOKEN_NAME);
  if (!accessToken || !refreshToken) {
    throw new BadRequestException('IM0002');
  }

  await validateToken(accessToken);
  const isRefreshTokenExists = await tokenCrud.isTokenExists(
    refreshToken,
    'REFRESH'
  );
  if (!isRefreshTokenExists) {
    throw new BadRequestException('IM0002');
  }

  await tokenCrud.deleteMany({ token: refreshToken, type: 'REFRESH' });
}
