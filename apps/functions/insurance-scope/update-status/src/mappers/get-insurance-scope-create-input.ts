import { InsuranceScopeStatus } from '@prisma/client';
import * as _ from 'lodash';

import { Address } from '@squaredash/address';

import { PopulatedInsuranceScopeDraft } from '../models/populated-insurance-scope-draft';

export const getInsuranceScopeCreateInput = (
  insuranceScopeDraft: PopulatedInsuranceScopeDraft,
  insuranceCarrierAddress: Address
) => ({
  data: {
    ...mapInsuranceScopeToToInput(insuranceScopeDraft),
    groups: {
      createMany: {
        data: insuranceScopeDraft.groups.map((group) =>
          _.omit(group, ['insuranceScopeDraftId'])
        ),
      },
    },
    company: {
      connect: {
        id: insuranceScopeDraft.companyId,
      },
    },
    customer: {
      connect: {
        id: insuranceScopeDraft.customer.customerId,
      },
    },
    insuranceCarrier: {
      create: mapInsuranceCarrierToInput(
        insuranceScopeDraft,
        insuranceCarrierAddress.id
      ),
    },
  },
});

const mapInsuranceScopeToToInput = (
  insuranceScopeDraft: PopulatedInsuranceScopeDraft
) => ({
  ..._.omit(insuranceScopeDraft, ['groups', 'companyId', 'items']),
  status: InsuranceScopeStatus.VERIFIED,
});

const mapInsuranceCarrierToInput = (
  insuranceScopeDraft: PopulatedInsuranceScopeDraft,
  insuranceCarrierAddressId: string
) => ({
  id: insuranceScopeDraft.insuranceCarrier.id,
  name: insuranceScopeDraft.insuranceCarrier.name,
  email: insuranceScopeDraft.insuranceCarrier.email,
  phone: insuranceScopeDraft.insuranceCarrier.phone,
  fax: insuranceScopeDraft.insuranceCarrier.fax,
  addressId: insuranceCarrierAddressId,
  adjusters: {
    connectOrCreate: insuranceScopeDraft.insuranceCarrier.adjusters.map(
      (adjuster) => ({
        where: {
          id: adjuster.id,
        },
        create: {
          id: adjuster.id,
          name: adjuster.name,
          type: adjuster.type,
          phone: adjuster.phone,
          email: adjuster.email,
          address: adjuster.address,
        },
      })
    ),
  },
});
