import { UserStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import * as companyCrudService from '@squaredash/crud/company';
import * as userCrud from '@squaredash/crud/user';
import {
  COMPANY_STATUS,
  USER_STATUS,
  User,
} from '@squaredash/shared/constants';
import { Config, generateSetCookiesHeader } from '@squaredash/shared/util';

import { SIGN_IN_STATUS } from './constants/sign-in-status';
import { InvalidUsernameOrPasswordError } from './errors';
import { AccountSuspendedError } from './errors/account-suspended-error';
import { generateTokens } from './helpers';
import { AuthTokens, SigninPayload } from './interfaces';
import * as lockoutRepository from './repository/lockout';
import { resendConfirmationEmail } from './resend-confirmation-email';

const lockoutSettings = Config.LOCKOUT_SETTINGS;

export async function signIn(
  payload: SigninPayload
): Promise<{ cookies: string[]; tokens: AuthTokens }> {
  const user = await validateUser(payload);
  if (user.status !== UserStatus.ACTIVE) {
    await resendConfirmationEmail(user);
  }

  const tokens = await generateTokens(user);

  return {
    cookies: generateSetCookiesHeader(tokens),
    tokens,
  };
}

async function validateUser(payload: SigninPayload): Promise<User> {
  const userWithPassword = await userCrud.findWithPassword({
    email: payload.email,
  });
  if (userWithPassword?.status === USER_STATUS.INACTIVE) {
    return userWithPassword;
  }

  if (userWithPassword?.companyId) {
    const company = await companyCrudService.find({
      id: userWithPassword.companyId,
    });
    if (company?.status === COMPANY_STATUS.INACTIVE) {
      throw new InvalidUsernameOrPasswordError();
    }
  }

  if (!userWithPassword) {
    throw new InvalidUsernameOrPasswordError();
  }

  if (userWithPassword.status === USER_STATUS.SUSPENDED) {
    throw new AccountSuspendedError();
  }

  const { password, ...user } = userWithPassword;

  if (
    user.lockedAt &&
    user.lockedAt.getTime() + lockoutSettings.lockoutDuration > Date.now()
  ) {
    throw new InvalidUsernameOrPasswordError();
  }

  if (!comparePassword(payload.password, password as string)) {
    await lockoutRepository.logSignInAttempt(
      payload.email,
      SIGN_IN_STATUS.FAILED
    );
    await checkFailedSignInAttempts(user.id);

    throw new InvalidUsernameOrPasswordError();
  }

  await lockoutRepository.logSignInAttempt(payload.email);

  return user;
}

export function comparePassword(
  enteredPassword: string,
  dbPassword: string
): boolean {
  return bcrypt.compareSync(enteredPassword, dbPassword);
}

export async function checkFailedSignInAttempts(userId: string): Promise<void> {
  const observationWindowEnd = new Date(
    Date.now() - lockoutSettings.observationWindow
  );
  const signInAttempts = await lockoutRepository.getSignInLogsInWindow(
    userId,
    observationWindowEnd,
    lockoutSettings.lockoutThreshold
  );

  const hasSuccessfulAttempt = signInAttempts.some(
    (attempt) => attempt.status === SIGN_IN_STATUS.SUCCESSFUL
  );
  if (
    !hasSuccessfulAttempt &&
    signInAttempts.length >= lockoutSettings.lockoutThreshold
  ) {
    await lockoutRepository.lockAccount(userId);
  }
}
