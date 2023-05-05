import { TokenType } from '@prisma/client';

import * as repository from './repository';

export async function isTokenExists(
  token: string,
  type: TokenType
): Promise<boolean> {
  return repository.isTokenExists(token, type);
}
