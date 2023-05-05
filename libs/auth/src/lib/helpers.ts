import { Token, TokenType, User } from '@prisma/client';

import { Config, generateJwtToken } from '@squaredash/shared/util';

import { AuthTokens } from './interfaces';
import * as tokenRepository from './repository/token';

const jwtConfig = Config.JWT;

export const generateTokens = async (
  user: Omit<User, 'password' | 'techStatus'>
): Promise<AuthTokens> => {
  const tokenPayload = {
    userId: user.id,
    role: user.role,
    companyId: user.companyId,
  };

  const accessToken = generateJwtToken(tokenPayload);
  const refreshToken = generateJwtToken(tokenPayload);

  await tokenRepository.create({
    token: refreshToken,
    user: {
      connect: {
        id: user.id,
      },
    },
    type: 'REFRESH',
  });

  return {
    accessToken,
    refreshToken,
  };
};

export async function mergeToken(
  data: Omit<Token, 'id' | 'createdAt' | 'updatedAt'>
) {
  return tokenRepository.merge(data);
}

export function getExpirationTimeByType(type: TokenType) {
  switch (type) {
    case 'CONFIRMATION':
      return jwtConfig.confirmationExpiresIn;
    case 'REFRESH':
      return jwtConfig.expiresIn;
    default:
      throw new Error('Unknown token type');
  }
}
