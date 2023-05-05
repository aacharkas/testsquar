import { PrismaClient, TechStatus } from '@prisma/client';
import * as _ from 'lodash';

import * as addressService from '@squaredash/address';
import * as insuranceScopeCrud from '@squaredash/crud/insurance-scope';
import * as insuranceScopeDraftCrud from '@squaredash/crud/insurance-scope-draft';
import * as insuranceScopeLineItemCrud from '@squaredash/crud/insurance-scope-line-item';
import { getAddressByText } from '@squaredash/shared/apis/google-maps';
import { NotFoundException } from '@squaredash/shared/util';

import { getInsuranceScopeCreateInput } from '../mappers/get-insurance-scope-create-input';
import {
  FindPopulatedScopeInput,
  PopulatedInsuranceScopeDraft,
} from '../models/populated-insurance-scope-draft';

export async function saveInsuranceScope(
  draftScopeId: string,
  tx?: PrismaClient
) {
  const insuranceScopeDraft = await getInsuranceScope(draftScopeId, tx);

  const insuranceCarrierAddress = await getInsuranceCarrierAddress(
    insuranceScopeDraft.insuranceCarrier.address,
    tx
  );

  const input = getInsuranceScopeCreateInput(
    insuranceScopeDraft,
    insuranceCarrierAddress
  );
  const createdInsuranceScope = await insuranceScopeCrud.create(input, tx);
  await insuranceScopeLineItemCrud.createMany(
    {
      data: insuranceScopeDraft.items.map((item) => ({
        ..._.omit(item, [
          'insuranceScopeDraftId',
          'insuranceScopeGroupDraftId',
        ]),
        insuranceScopeId: createdInsuranceScope.id,
        insuranceScopeGroupId: item.insuranceScopeGroupDraftId,
      })),
    },
    tx
  );

  await insuranceScopeDraftCrud.deleteById(insuranceScopeDraft.id, tx);

  return createdInsuranceScope;
}

async function getInsuranceScope(draftScopeId: string, tx?: PrismaClient) {
  const findScopeInput: FindPopulatedScopeInput = {
    where: {
      id: draftScopeId,
    },
    include: {
      groups: true,
      items: true,
      customer: true,
      insuranceCarrier: {
        include: {
          adjusters: true,
        },
      },
    },
  };

  const insuranceScope = (await insuranceScopeDraftCrud.findUnique(
    findScopeInput,
    tx
  )) as PopulatedInsuranceScopeDraft | null;
  if (!insuranceScope) {
    throw new NotFoundException('IM0053');
  }

  return insuranceScope;
}

async function getInsuranceCarrierAddress(address: string, tx?: PrismaClient) {
  const insuranceCarrierAddressData = await getAddressByText(address);
  return addressService.findOrCreate(
    {
      country_state_city_zipCode_streetAddress1_formattedAddress: _.omit(
        insuranceCarrierAddressData,
        ['placeId', 'streetAddress2', 'apartment', 'latitude', 'longitude']
      ),
    },
    {
      ...insuranceCarrierAddressData,
      techStatus: TechStatus.ACTIVE,
    },
    tx
  );
}
