import { Company, Prisma, PrismaClient, User } from '@prisma/client';

import * as companyCrud from '@squaredash/crud/company';
import * as userCrud from '@squaredash/crud/user';
import { USER_ROLE } from '@squaredash/shared/constants';
import {
  Config,
  TemplateIds,
  generateJwtToken,
  sendMail,
} from '@squaredash/shared/util';

import {
  NonExistentCompanyError,
  ProvidedEmailIsAlreadyInUseError,
} from './errors';
import { InvitationSendPayload } from './interfaces/invitation-send-payload';
import { mapInvitationSendPayloadToCreateUserInput } from './mappers/invitation-send-payload-to-create-user-input';
import * as invitationRepository from './repository/invitation';

const config = { ...Config.JWT, ...Config.APP };

export async function send(
  sender: Omit<User, 'password'>,
  invite: InvitationSendPayload,
  companyId?: string,
  tx?: PrismaClient
) {
  let company;
  if (sender.companyId || companyId) {
    company = await companyCrud.find(
      {
        id: sender.companyId || companyId,
      },
      tx
    );

    if (!company) {
      throw new NonExistentCompanyError();
    }
  }

  return sendEmailWithInvite(invite, company, tx);
}

async function sendEmailWithInvite(
  invite: InvitationSendPayload,
  company?: Company,
  tx?: PrismaClient
) {
  const existingUser = await userCrud.find(
    {
      where: { email: invite.email },
    },
    tx
  );

  if (existingUser) {
    throw new ProvidedEmailIsAlreadyInUseError();
  }

  const user = await connectCompanyOrSkip(invite, company, tx);

  const existingInvitation = await invitationRepository.find(
    {
      email: user.email,
    },
    tx
  );

  if (existingInvitation) {
    await invitationRepository.remove(
      {
        id: existingInvitation.id,
      },
      tx
    );
  }

  const createInput: Prisma.InvitationCreateInput = {
    email: invite.email,
    role: invite.role,
  };

  if (company) {
    createInput.company = {
      connect: { id: company.id },
    };
  }

  const invitation = await invitationRepository.create(createInput, tx);

  const token = generateJwtToken(
    {
      invitationId: invitation.id,
      ...invite,
    },
    config.invitationExpiresIn,
    config.invitationSecret
  );

  const template = getTemplate(invite, token, company);
  return sendMail({
    recipient: invite.email,
    template,
  });
}

function getTemplate(
  invite: InvitationSendPayload,
  token: string,
  company?: Company
) {
  let templateId: TemplateIds;
  const templateData: Record<string, string> = {
    name: invite.name,
    invitationUrl: `${config.url}/login/member-signup?token=${token}`,
  };

  if (invite.role === USER_ROLE.SUPER_ADMIN) {
    templateId = TemplateIds.superAdminInvitation;
  } else {
    templateId = TemplateIds.invitationEmail;

    templateData['companyName'] = company?.name ?? '';
    templateData['role'] = getRoleName(invite.role as USER_ROLE);
  }

  return {
    id: templateId,
    data: templateData,
  };
}

function getRoleName(role: USER_ROLE): string {
  switch (role) {
    case USER_ROLE.COMPANY_ADMIN:
      return 'Admin';
    case USER_ROLE.COMPANY_OWNER:
      return 'Owner';
    case USER_ROLE.COMPANY_USER:
      return 'Member';
    case USER_ROLE.INITIAL_ADMIN:
    case USER_ROLE.SUPER_ADMIN:
      return 'Super Admin';
    default:
      return '';
  }
}

async function connectCompanyOrSkip(
  invite: InvitationSendPayload,
  company?: Company,
  tx?: PrismaClient
) {
  const data: Prisma.UserCreateInput =
    mapInvitationSendPayloadToCreateUserInput(invite);

  return company
    ? userCrud.create(
        {
          ...data,
          Company: {
            connect: {
              id: company.id,
            },
          },
        },
        tx
      )
    : userCrud.create(data, tx);
}
