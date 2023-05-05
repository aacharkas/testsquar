import * as insuranceCarrierCrud from '@squaredash/crud/insurance-carrier';
import { InsuranceCarrierNotFoundError } from '@squaredash/crud/insurance-carrier';
import { TECH_STATUS } from '@squaredash/shared/constants';

export async function remove(id: string) {
  const insuranceCarrier = await insuranceCarrierCrud.find({ id });

  if (!insuranceCarrier) {
    throw new InsuranceCarrierNotFoundError();
  }

  return await insuranceCarrierCrud.update(
    { id },
    { techStatus: TECH_STATUS.DELETED }
  );
}
