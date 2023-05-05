import * as insuranceCarrierCrud from '@squaredash/crud/insurance-carrier';
import { handleUniqueConstraintError } from '@squaredash/crud/insurance-carrier';
import { addressCreateOrConnect } from '@squaredash/shared/util';

import { CreateInsuranceCarrierPayload } from './models/create-insurance-carrier-payload';

export async function create(payload: CreateInsuranceCarrierPayload) {
  const { address, ...data } = payload;

  try {
    return await insuranceCarrierCrud.create({
      ...data,
      address: address ? addressCreateOrConnect(address) : undefined,
    });
  } catch (error: any) {
    handleUniqueConstraintError(error);
  }
}
