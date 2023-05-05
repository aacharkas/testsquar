import { Prisma } from '@prisma/client';

import * as unitOfMeasurementService from '@squaredash/crud/unit-of-measurement';
import { SORT_ORDER } from '@squaredash/shared/constants';
import { List } from '@squaredash/shared/interfaces';

import { UnitOfMeasurement } from '../../../../../../libs/crud/unit-of-measurement/src/lib/models/unit-of-measurement';
import { UnitOfMeasurementListQuery } from '../models/unit-of-measurement-list-query';

export async function list(
  query: UnitOfMeasurementListQuery
): Promise<List<UnitOfMeasurement>> {
  const args: Prisma.UnitOfMeasurementFindManyArgs = {
    where: {
      name: {
        contains: query.search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: SORT_ORDER.ASC,
    },
    skip: query.skip,
    take: query.take,
  };

  return unitOfMeasurementService.findMany(args);
}
