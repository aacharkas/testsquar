import * as insuranceCarrierCrud from '@squaredash/crud/insurance-carrier';
import { InsuranceCarrierNotFoundError } from '@squaredash/crud/insurance-carrier';

export async function get(id: string) {
  const insuranceCarrier = insuranceCarrierCrud.getById(id);

  if (!insuranceCarrier) {
    throw new InsuranceCarrierNotFoundError();
  }

  return insuranceCarrier;
}
