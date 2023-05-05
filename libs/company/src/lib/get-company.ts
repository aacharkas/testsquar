import { CompanyNotFoundError } from './errors/not-found';
import { CompanyWithMeta } from './interfaces/company-with-meta';
import * as repository from './repository/get-by-id-with-meta';

export async function getByIdWithMeta(
  companyId: string
): Promise<CompanyWithMeta> {
  const company = await repository.getByIdWithMeta(companyId);
  if (!company) {
    throw new CompanyNotFoundError();
  }

  return company;
}
