import { CompanyLocationNotFoundError, LocationUpdateError } from './errors';
import { handleUniqueConstraintLocationError } from './handle-unique-constraint-error-location';
import { CompanyLocation, CompanyLocationUpdate } from './interfaces';
import * as companyRepository from './repository/company';

export async function updateLocation(
  locationId: string,
  companyId: string,
  updateData: CompanyLocationUpdate
): Promise<CompanyLocation> {
  const companyLocation = await companyRepository.getLocationById(locationId);

  if (
    !companyLocation ||
    (companyId && companyId !== companyLocation.companyId)
  ) {
    throw new CompanyLocationNotFoundError();
  }

  if (companyLocation.isMain === true && updateData.isMain === false) {
    throw new LocationUpdateError();
  }

  try {
    return await companyRepository.updateLocation(
      locationId,
      companyId,
      updateData
    );
  } catch (error) {
    handleUniqueConstraintLocationError(error);
  }
}
