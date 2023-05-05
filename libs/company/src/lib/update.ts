import { handleUniqueConstraintError } from './handle-unique-constraint-error';
import { CompanyUpdate } from './interfaces/company-update';
import * as repository from './repository/update';

export async function update(
  companyId: string,
  updateData: CompanyUpdate
): Promise<void> {
  try {
    await repository.update(companyId, updateData);
  } catch (error) {
    handleUniqueConstraintError(error);
  }
}
