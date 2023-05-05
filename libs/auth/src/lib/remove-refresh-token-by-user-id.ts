import * as repository from './repository/token';

export async function removeRefreshTokenByUserId(
  userId: string,
  currentToken: string
): Promise<void> {
  await repository.removeByUserId(userId, currentToken, 'REFRESH');
}
