import { Prisma, PrismaClient } from '@prisma/client';

import { USER_ROLE } from '@squaredash/shared/constants';
import { TECH_STATUS } from '@squaredash/shared/constants';
import { numberOfOwnersDisplayed } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { List, Nullable } from '@squaredash/shared/interfaces';
import { addressCreateOrConnect } from '@squaredash/shared/util';

import {
  Company,
  CompanyListRow,
  CompanyLocation,
  CompanyLocationUpdate,
  CompanySearchOptions,
  CreateCompanyLocationPayload,
} from '../interfaces';
import {
  companyEntityToCompany,
  companyEntityToCompanyListRow,
} from '../mappers';
import { CompanyModel } from '../types';

const companyWithOwnersQuery = {
  include: {
    users: {
      where: { role: USER_ROLE.COMPANY_OWNER, techStatus: TECH_STATUS.ACTIVE },
      take: numberOfOwnersDisplayed,
    },
  },
};

async function countOwners(
  companyId: string,
  tx?: PrismaClient
): Promise<number> {
  const executor = tx ?? prisma;

  return executor.user.count({
    where: {
      companyId,
      role: USER_ROLE.COMPANY_OWNER,
      techStatus: TECH_STATUS.ACTIVE,
    },
  });
}

async function unsetMainLocation(
  tx: PrismaClient,
  companyId: string
): Promise<void> {
  await tx.companyLocation.updateMany({
    where: {
      companyId,
      isMain: true,
    },
    data: {
      isMain: false,
    },
  });
}

export async function getById(
  id: string,
  tx?: PrismaClient
): Promise<Nullable<Company>> {
  const executor = tx ?? prisma;

  const [company, ownerCount]: [CompanyModel, number] = await Promise.all([
    executor.company.findFirst({
      where: {
        id,
        techStatus: {
          not: TECH_STATUS.DELETED,
        },
      },
      ...companyWithOwnersQuery,
    }),
    countOwners(id, tx),
  ]);

  return company ? companyEntityToCompany(company, ownerCount) : null;
}

export async function getLocationById(
  id: string
): Promise<Nullable<CompanyLocation>> {
  return prisma.companyLocation.findFirst({
    where: {
      id: id,
      techStatus: {
        not: TECH_STATUS.DELETED,
      },
    },
    include: {
      address: true,
    },
  });
}

export async function create(
  payload: Prisma.CompanyCreateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  const company = await executor.company.create({
    ...payload,
    data: {
      ...payload.data,
    },
    ...companyWithOwnersQuery,
  });

  return {
    id: company.id,
    name: company.name,
    owners: {
      rows: company.users.map((user) => ({
        id: user.id,
        name: user.name,
      })),
      totalCount: 1,
    },
  };
}

export async function createLocation(
  payload: CreateCompanyLocationPayload
): Promise<CompanyLocation> {
  return await prisma.$transaction(async (tx: PrismaClient) => {
    if (payload.isMain) {
      await unsetMainLocation(tx, payload.company);
    } else {
      const count = await tx.companyLocation.count({
        where: {
          companyId: payload.company,
          techStatus: {
            not: TECH_STATUS.DELETED,
          },
        },
        take: 1,
      });

      if (count === 0) {
        payload.isMain = true;
      }
    }

    return tx.companyLocation.create({
      data: {
        ...payload,
        address: addressCreateOrConnect(payload.address),
        company: {
          connect: { id: payload.company },
        },
      },
      include: {
        address: true,
      },
    });
  });
}

export async function updateLocation(
  id: string,
  companyId: string,
  payload: CompanyLocationUpdate
): Promise<CompanyLocation> {
  return await prisma.$transaction(async (tx: PrismaClient) => {
    if (payload.isMain) {
      await unsetMainLocation(tx, companyId);
    }

    return tx.companyLocation.update({
      data: {
        ...payload,
        address: payload.address
          ? addressCreateOrConnect(payload.address)
          : undefined,
      },
      where: {
        id,
      },
      include: {
        address: true,
      },
    });
  });
}

export async function list(
  searchOptions: CompanySearchOptions
): Promise<List<CompanyListRow>> {
  const whereInput: Prisma.CompanyWhereInput = {
    name: {
      contains: searchOptions.search,
      mode: 'insensitive',
    },
    techStatus: {
      not: TECH_STATUS.DELETED,
    },
  };

  const [companies, totalCount]: [CompanyModel[], number] = await Promise.all([
    prisma.company.findMany({
      where: whereInput,
      orderBy: {
        [searchOptions.sortCol]: searchOptions.sortOrder,
      },
      skip: searchOptions.skip,
      take: searchOptions.take,
      ...companyWithOwnersQuery,
    }),
    prisma.company.count({ where: whereInput }),
  ]);

  const rows = await Promise.all(
    companies.map(async (company) => {
      const userCount = await countOwners(company.id);
      return companyEntityToCompanyListRow(company, userCount);
    })
  );

  return {
    rows,
    totalCount,
  };
}

export async function deleteLocation(id: string): Promise<void> {
  await prisma.companyLocation.update({
    data: {
      techStatus: TECH_STATUS.DELETED,
      address: {
        update: {
          techStatus: TECH_STATUS.DELETED,
        },
      },
    },
    where: {
      id,
    },
  });
}
