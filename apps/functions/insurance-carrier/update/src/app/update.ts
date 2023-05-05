import * as insuranceCarrierCrud from '@squaredash/crud/insurance-carrier';
import {
  InsuranceCarrierNotFoundError,
  handleUniqueConstraintError,
} from '@squaredash/crud/insurance-carrier';
import { addressCreateOrConnect } from '@squaredash/shared/util';

import { UpdateInsuranceCarrierPayload } from './models/update-insurance-carrier-payload';

export async function update(
  id: string,
  payload: UpdateInsuranceCarrierPayload
) {
  const insuranceCarrier = await insuranceCarrierCrud.find({ id });

  if (!insuranceCarrier) {
    throw new InsuranceCarrierNotFoundError();
  }

  const { address, ...data } = payload;

  try {
    return await insuranceCarrierCrud.update(
      { id },
      {
        ...data,
        address: address ? addressCreateOrConnect(address) : undefined,
      }
    );
  } catch (error: any) {
    handleUniqueConstraintError(error);
  }
}
