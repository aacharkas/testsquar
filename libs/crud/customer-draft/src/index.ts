import { Prisma, PrismaClient } from '@prisma/client';

import * as customersService from '@squaredash/customer';
import {
  CustomerNotFoundError,
  CustomerWithDisplayNameAlreadyExistsError,
} from '@squaredash/customer';
import * as emailService from '@squaredash/email';
import * as phoneNumberService from '@squaredash/phone-number';
import { prisma } from '@squaredash/shared/db';

import { CustomerEmailIsInUseException } from './lib/exceptions/customer-email-is-in-use.exception';
import { CustomerPhoneNumberIsInUseException } from './lib/exceptions/customer-phone-number-is-in-use.exception';
import { CustomerDraft } from './lib/models/customer-draft';
import { SaveCustomerDetails } from './lib/models/save-customer-details';
import * as repository from './lib/repository';

export async function create(
  data: Prisma.CustomerDraftCreateInput,
  tx?: PrismaClient
): Promise<CustomerDraft> {
  return repository.create(data, tx);
}

export async function update(
  where: Prisma.CustomerDraftWhereUniqueInput,
  data: Prisma.CustomerDraftUpdateInput
): Promise<CustomerDraft> {
  return repository.update(where, data);
}

export async function saveById(
  customerDraftId: string,
  customer: SaveCustomerDetails | string
) {
  return prisma.$transaction(async (tx: PrismaClient) => {
    const customerDraft = await repository.findById(customerDraftId, tx);

    if (!customerDraft) {
      return null;
    }

    if (typeof customer === 'string') {
      const existingCustomer = await customersService.findById(customer, tx);

      if (!existingCustomer) {
        throw new CustomerNotFoundError();
      }

      return repository.connectCustomer(customerDraftId, customer, tx);
    }

    const existingCustomer = await customersService.findByDisplayName(
      customer.displayName,
      tx
    );

    if (existingCustomer) {
      throw new CustomerWithDisplayNameAlreadyExistsError();
    }

    if (
      await emailService.isCustomerEmailInUse(
        customer.email,
        customerDraft.insuranceScopeDraft.companyId,
        tx
      )
    ) {
      throw new CustomerEmailIsInUseException();
    }

    if (
      await phoneNumberService.isPhoneNumberUsedByCompanyCustomer(
        customerDraft.insuranceScopeDraft.companyId,
        customer.phoneNumber,
        tx
      )
    ) {
      throw new CustomerPhoneNumberIsInUseException();
    }

    const createdCustomer = await customersService.create(
      {
        company: customer.company,
        displayName: customer.displayName,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phoneNumber,
        responsibleMembers: [customer.responsibleMemberId],
        billingName: customer.billingInformation.name,
        billingAddress: customer.billingInformation.address,
        shippingName: customer.shippingInformation.name,
        shippingAddress: customer.shippingInformation.address,
      },
      tx
    );

    return repository.connectCustomer(customerDraftId, createdCustomer.id, tx);
  });
}
