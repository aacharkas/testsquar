import * as jwt from 'jsonwebtoken';

import { Config } from './config';

const jwtConfig = Config.JWT;

export async function validateToken<T>(
  token: string,
  secret = jwtConfig.jwtSecret
): Promise<T> {
  try {
    return (await jwt.verify(token, `${secret}`)) as T;
  } catch {
    throw new Error('JWT verification failed');
  }
}

export const generateJwtToken = (
  payload: { [key: string]: unknown },
  expiresIn = jwtConfig.expiresIn,
  secret = jwtConfig.jwtSecret
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
};
