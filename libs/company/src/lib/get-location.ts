import { Nullable } from '@squaredash/shared/interfaces';

import { CompanyLocationNotFoundError } from './errors';
import { CompanyLocation } from './interfaces';
import * as companyRepository from './repository/company';

export async function getLocationById(
  locationId: string
): Promise<CompanyLocation> {
  const companyLocation: Nullable<CompanyLocation> =
    await companyRepository.getLocationById(locationId);

  if (!companyLocation) {
    throw new CompanyLocationNotFoundError();
  }

  return companyLocation;
}
