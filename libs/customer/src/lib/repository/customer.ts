import { Prisma, PrismaClient } from '@prisma/client';

import {
  CUSTOMER_CHANGE_ACTION,
  TECH_STATUS,
} from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { List } from '@squaredash/shared/interfaces';
import { addressCreateOrConnect, getChanges } from '@squaredash/shared/util';

import { commonInclude } from '../consts';
import {
  customerModelToCustomer,
  customerModelWithMetaToCustomerWithMeta,
  populatedCustomerToCustomer,
} from '../mappers';
import {
  CreateCustomerPayload,
  Customer,
  CustomerFind,
  CustomerModel,
  CustomerModelWithMeta,
  CustomerWithMeta,
  ListCustomerPayload,
  UpdateCustomerPayload,
} from '../models';
import { PopulatedCustomer } from '../models/populated-customer';
import {
  customersListWithSearchCountQueryFactory,
  customersListWithSearchQueryFactory,
} from '../queries/customers-list-with-search.query-factory';
import { responsibleMembersQueryFactory } from '../queries/responsible-members.query-factory';

export async function create(
  data: CreateCustomerPayload,
  tx?: PrismaClient
): Promise<Customer> {
  const executor = tx ?? prisma;

  const customerModel: CustomerModel = await executor.customer.create({
    data: {
      ...data,
      shippingAddress: addressCreateOrConnect(data.shippingAddress),
      billingAddress: addressCreateOrConnect(data.billingAddress),
      company: {
        connect: { id: data.company },
      },
      parent: {
        connect: data.parent ? { id: data.parent } : undefined,
      },
      responsibleMembers: {
        create: data.responsibleMembers.map((userId) => ({
          userId,
        })),
      },
    },
    include: {
      ...commonInclude,
    },
  });

  return customerModelToCustomer(customerModel);
}

export async function update(
  id: string,
  userId: string,
  data: UpdateCustomerPayload,
  oldData: CustomerFind
): Promise<Customer> {
  return await prisma.$transaction(async (tx) => {
    // @dev log action
    const responsibleMembers = oldData.responsibleMembers?.map(
      (member) => member.userId
    );
    const changes = getChanges({ ...oldData, responsibleMembers }, data);

    await tx.customerChangesLog.create({
      data: {
        userId,
        customerId: id,
        type: CUSTOMER_CHANGE_ACTION.UPDATE,
        content: changes as unknown as Prisma.InputJsonValue,
      },
    });

    // @dev update entity
    const customerData: Prisma.CustomerUpdateInput = {
      ...data,
      shippingAddress: data.shippingAddress
        ? addressCreateOrConnect(data.shippingAddress)
        : undefined,
      billingAddress: data.billingAddress
        ? addressCreateOrConnect(data.billingAddress)
        : undefined,
    };

    if (data.parent !== undefined) {
      customerData.parent =
        data.parent === null
          ? { disconnect: true }
          : { connect: { id: data.parent } };
    }

    if (data.responsibleMembers) {
      await tx.customer.update({
        where: {
          id,
        },
        data: {
          responsibleMembers: {
            deleteMany: {},
          },
        },
      });

      customerData.responsibleMembers = {
        create: data.responsibleMembers.map((userId) => ({ userId })),
      };
    }

    const customerModel: CustomerModel = await tx.customer.update({
      where: {
        id,
      },
      data: customerData,
      include: {
        ...commonInclude,
      },
    });

    return customerModelToCustomer(customerModel);
  });
}

export async function getById(id: string): Promise<Customer | null> {
  const customerModel: CustomerModel | null = await prisma.customer.findFirst({
    where: {
      id,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include: {
      ...commonInclude,
    },
  });

  return customerModel ? customerModelToCustomer(customerModel) : null;
}

export async function getByIdWithMeta(
  id: string
): Promise<CustomerWithMeta | null> {
  const customerModelWithMeta: CustomerModelWithMeta | null =
    await prisma.customer.findFirst({
      where: {
        id,
        techStatus: {
          not: TECH_STATUS.DELETED,
        },
      },
      include: {
        parent: true,
        subCustomers: true,
        ...commonInclude,
      },
    });

  return customerModelWithMeta
    ? customerModelWithMetaToCustomerWithMeta(customerModelWithMeta)
    : null;
}

export async function findByDisplayName(
  displayName: string,
  tx?: PrismaClient
): Promise<Customer | null> {
  const executor = tx ?? prisma;

  const customerModel: CustomerModel | null = await executor.customer.findFirst(
    {
      where: {
        displayName,
        techStatus: {
          not: TECH_STATUS.DELETED,
        },
      },
      include: commonInclude,
    }
  );

  return customerModel ? customerModelToCustomer(customerModel) : null;
}

export async function find(
  where: Prisma.CustomerWhereInput,
  include?: Prisma.CustomerInclude,
  tx?: PrismaClient
): Promise<CustomerFind | null> {
  const executor = tx ?? prisma;

  return executor.customer.findFirst({
    where: {
      ...where,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include,
  });
}

export async function deleteCustomer(
  id: string,
  userId: string
): Promise<void> {
  return await prisma.$transaction(async (tx) => {
    await tx.customer.update({
      where: {
        id,
      },
      data: {
        techStatus: TECH_STATUS.DELETED,
      },
    });

    await tx.customer.updateMany({
      where: {
        parentId: id,
      },
      data: {
        parentId: null,
      },
    });

    await tx.customerChangesLog.create({
      data: {
        userId,
        customerId: id,
      },
    });
  });
}

export async function list(
  searchOptions: ListCustomerPayload
): Promise<List<Customer>> {
  return prisma.$transaction(async (transaction) => {
    const query = customersListWithSearchQueryFactory(searchOptions);

    const customers: PopulatedCustomer[] = await transaction.$queryRawUnsafe(
      query,
      searchOptions.search || '',
      searchOptions.companyId,
      searchOptions.take,
      searchOptions.skip,
      searchOptions.responsibleMembers || '',
      searchOptions.parents || '',
      searchOptions.type ?? ''
    );

    for (const customer of customers) {
      customer.responsibleMembers = await transaction.$queryRaw(
        responsibleMembersQueryFactory(customer.customer_id)
      );
    }

    const result: [{ count: number }] = await transaction.$queryRawUnsafe(
      customersListWithSearchCountQueryFactory(searchOptions),
      searchOptions.search || '',
      searchOptions.companyId,
      searchOptions.take,
      searchOptions.skip,
      searchOptions.responsibleMembers || '',
      searchOptions.parents || '',
      searchOptions.type ?? ''
    );

    return {
      rows: customers.map(populatedCustomerToCustomer),
      totalCount: Number(result[0]?.count) || 0,
    };
  });
}

export function findByEmail(email: string) {
  return prisma.customer.findFirst({ where: { email } });
}
