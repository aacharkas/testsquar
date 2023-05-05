import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { CreateAddressPayload } from '@squaredash/address';
import * as addressService from '@squaredash/address';
import * as companyCrud from '@squaredash/crud/company';
import * as invitationService from '@squaredash/invitation';
import { TOPIC } from '@squaredash/message-queue';
import * as messageQueueService from '@squaredash/message-queue';
import { isPasswordPwned } from '@squaredash/shared/apis/pwnedpasswords';
import {
  COMPANY_STATUS,
  TECH_STATUS,
  USER_ROLE,
  USER_STATUS,
} from '@squaredash/shared/constants';
import {
  Config,
  TemplateIds,
  addressCreateOrConnect,
  generateJwtToken,
  generateSetCookiesHeader,
} from '@squaredash/shared/util';
import { userRepository } from '@squaredash/user';

import {
  ForbiddenError,
  InvalidUsernameOrPasswordError,
  PasswordPwnedError,
} from './errors';
import { generateTokens, mergeToken } from './helpers';
import { AuthTokens, SignUpPayload } from './interfaces';

const config = { ...Config.APP, ...Config.JWT };

export async function signUp(
  payload: SignUpPayload
): Promise<{ cookies: string[]; tokens: AuthTokens }> {
  const invitation = await invitationService.getInvitationFromToken(
    payload.invitationToken
  );
  delete payload.invitationToken;

  const existingUser = await userRepository.getByEmail(payload.email);
  if (existingUser?.techStatus === TECH_STATUS.DELETED) {
    throw new InvalidUsernameOrPasswordError();
  }

  if (existingUser && !invitation) {
    throw new InvalidUsernameOrPasswordError();
  }

  const passwordPwned = await isPasswordPwned(payload.password);
  if (passwordPwned) {
    throw new PasswordPwnedError();
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // TODO: add logo (s3 integration)

  if (!invitation) {
    const { address, ...userPayload } = payload;
    const addressConnect = await createAddress(address);

    const user = await userRepository.create({
      ...userPayload,
      ...addressConnect,
      role: USER_ROLE.COMPANY_OWNER,
      password: hashedPassword,
    });
    return sendConfirmationLinkAndGenerateTokens(user);
  }

  if (invitation.email !== payload.email) {
    throw new ForbiddenError();
  }

  const { address, ...userData } = payload;

  const user = await userRepository.update(
    { email: payload.email },
    {
      ...userData,
      Address: address ? addressCreateOrConnect(address) : undefined,
      role: invitation.role,
      password: hashedPassword,
      status: USER_STATUS.ACTIVE,
      Company: {
        connect: invitation.companyId
          ? { id: invitation.companyId }
          : undefined,
      },
    }
  );

  await activateCompany(user);

  const tokens = await generateTokens(user);

  return {
    cookies: generateSetCookiesHeader(tokens),
    tokens,
  };
}

async function activateCompany(user: Omit<User, 'password'>): Promise<void> {
  if (user.role !== USER_ROLE.COMPANY_OWNER) {
    return;
  }

  const company = (await companyCrud.find({ id: user.companyId! }))!;
  if (company.techStatus === TECH_STATUS.ACTIVE) {
    await companyCrud.update(
      { id: user.companyId! },
      { status: COMPANY_STATUS.ACTIVE }
    );
  }
}

async function sendConfirmationLinkAndGenerateTokens(
  user: User
): Promise<{ cookies: string[]; tokens: AuthTokens }> {
  const token = generateJwtToken(
    {
      userId: user.id,
    },
    config.confirmationExpiresIn,
    config.confirmationSecret
  );

  await mergeToken({
    userId: user.id,
    type: 'CONFIRMATION',
    token,
  });

  await messageQueueService.add(TOPIC.EMAIL_NOTIFICATION, {
    recipient: user.email,
    templateId: TemplateIds.verifyEmail,
    data: {
      name: user.name,
      confirmationUrl: `${config.url}/login/company-signup?token=${token}`,
    },
  });

  const tokens = await generateTokens(user);

  return {
    cookies: generateSetCookiesHeader(tokens),
    tokens,
  };
}

async function createAddress(address?: CreateAddressPayload) {
  if (address) {
    const { id } = await addressService.create(address);
    return {
      Address: {
        connect: { id },
      },
    };
  }
  return {};
}
