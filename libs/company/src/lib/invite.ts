import { PrismaClient } from '@prisma/client';

import { EmailAlreadyInUseError } from '@squaredash/auth';
import * as userCrud from '@squaredash/crud/user';
import { customerRepository } from '@squaredash/customer';
import * as invitationService from '@squaredash/invitation';
import { USER_ROLE } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { UserNotFoundError, userRepository } from '@squaredash/user';

import { handleUniqueConstraintError } from './handle-unique-constraint-error';
import { Company, CompanyInvite } from './interfaces';
import * as companyRepository from './repository/company';

export async function invite(
  invitorId: string,
  invite: CompanyInvite
): Promise<Company> {
  const { ownerEmail, ownerName } = invite;

  const userByEmail = await userRepository.find({
    email: invite.ownerEmail,
  });
  if (userByEmail) {
    throw new EmailAlreadyInUseError();
  }

  const customer = await customerRepository.find({
    email: invite.ownerEmail,
  });
  if (customer) {
    throw new EmailAlreadyInUseError();
  }

  const user = await userCrud.find({ where: { id: invitorId } });
  if (!user) {
    throw new UserNotFoundError();
  }

  try {
    return await prisma.$transaction(async (tx: PrismaClient) => {
      const company = await companyRepository.create({ data: invite.data }, tx);
      await invitationService.send(
        user,
        { email: ownerEmail, name: ownerName, role: USER_ROLE.COMPANY_OWNER },
        company.id,
        tx
      );

      return (await companyRepository.getById(company.id, tx))!;
    });
  } catch (error) {
    handleUniqueConstraintError(error);
  }
}
