import * as tokenCrud from '@squaredash/crud/token';
import { USER_STATUS } from '@squaredash/shared/constants';
import {
  Config,
  generateSetCookiesHeader,
  validateToken,
} from '@squaredash/shared/util';
import * as userService from '@squaredash/user';

import { InvalidUsernameOrPasswordError } from './errors';
import { generateTokens } from './helpers';
import { ConfirmationTokenPayload } from './interfaces';

const config = Config.JWT;

export async function verifyEmail(token: string) {
  try {
    const existingToken = await tokenCrud.isTokenExists(token, 'CONFIRMATION');

    if (!existingToken) {
      throw new Error('Token doesnt exist');
    }

    const { userId } = await validateToken<ConfirmationTokenPayload>(
      token,
      config.confirmationSecret
    );
    const user = await userService.update(
      {
        id: userId,
      },
      {
        status: USER_STATUS.ACTIVE,
      }
    );

    await tokenCrud.deleteMany({ token, type: 'CONFIRMATION' });

    const tokens = await generateTokens(user);
    const cookies = generateSetCookiesHeader(tokens);

    return {
      tokens,
      cookies,
    };
  } catch {
    throw new InvalidUsernameOrPasswordError();
  }
}
