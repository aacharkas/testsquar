import { Nullable } from '@squaredash/shared/interfaces';

import { LocationDeletionError, MainLocationDeletionError } from './errors';
import { CompanyLocation } from './interfaces';
import * as companyRepository from './repository/company';

export async function deleteLocation(
  locationId: string,
  companyId?: string
): Promise<void> {
  const companyLocation: Nullable<CompanyLocation> =
    await companyRepository.getLocationById(locationId);

  if (
    !companyLocation ||
    (companyId && companyId !== companyLocation.companyId)
  ) {
    throw new LocationDeletionError();
  }

  if (companyLocation.isMain) {
    throw new MainLocationDeletionError();
  }

  await companyRepository.deleteLocation(locationId);
}
