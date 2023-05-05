import { handleUniqueConstraintLocationError } from './handle-unique-constraint-error-location';
import { CompanyLocation, CreateCompanyLocationPayload } from './interfaces';
import * as companyRepository from './repository/company';

export async function createLocation(
  payload: CreateCompanyLocationPayload
): Promise<CompanyLocation> {
  try {
    return await companyRepository.createLocation(payload);
  } catch (error) {
    handleUniqueConstraintLocationError(error);
  }
}
