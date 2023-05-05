import { InsuranceScopeLineItemView as InsuranceScopeLineItemViewModel } from '@prisma/client';

import {
  CustomerInfo,
  InsuranceCarrierAdjusterInfo,
  InsuranceCarrierInfo,
  InsuranceScopeGroupInfo,
  InsuranceScopeLineItemInfo,
  InsuranceScopeWithMeta,
} from '@squaredash/crud/insurance-scope';
import { InsuranceScopeListItem } from '@squaredash/crud/insurance-scope';

import { InsuranceScopeListQueryResult } from '../models/insurance-scope-list-query-result';
import {
  CustomerViewQueryResult,
  InsuranceCarrierViewQueryResult,
  InsuranceScopeWithMetaQueryResult,
} from '../models/insurance-scope-with-meta-query-result';

export const insuranceScopeListItemQueryResultToListItem = (
  result: InsuranceScopeListQueryResult
): InsuranceScopeListItem => ({
  id: result.id,
  createdAt: result.createdAt,
  companyName: result.companyName,
  dateOfLoss: result.dateOfLoss,
  claimNumber: result.claimNumber,
  customerName: result.savedCustomerName ?? result.customerName,
  propertyAddress: result.propertyAddress,
  insuranceCarrierName: result.insuranceCarrierName,
  rcv: result.totalRcv,
  deductible: result.deductible,
  status: result.status,
  versionId: result.versionId,
});

export const insuranceScopeWithMetaQueryResultToInsuranceScopeWithMeta = (
  result: InsuranceScopeWithMetaQueryResult
): InsuranceScopeWithMeta => ({
  id: result.id,
  claimNumber: result.claimNumber,
  typeOfLoss: result.typeOfLoss,
  dateOfLoss: result.dateOfLoss,
  dateInspected: result.dateInspected,
  dateContacted: result.dateContacted,
  dateReceived: result.dateReceived,
  dateEntered: result.dateEntered,
  policyNumber: result.policyNumber,
  priceList: result.priceList,
  status: result.status,
  initialDocumentId: result.initialDocumentId,
  initialDocumentName: result.initialDocumentName,
  totalLineItems: result.totalLineItems,
  totalTax: result.totalTax,
  totalRcv: result.totalRcv,
  totalAcv: result.totalAcv,
  totalOverhead: result.totalOverhead,
  totalDepreciation: result.totalDepreciation,
  deductible: result.deductible,
  netClaimSum: result.netClaimSum,
  totalRecoverableDepreciationSum: result.totalRecoverableDepreciationSum,
  totalNonRecoverableDepreciationSum: result.totalNonRecoverableDepreciationSum,
  netClaimIfDepreciationIsRecovered: result.netClaimIfDepreciationIsRecovered,
  createdAt: result.createdAt,
  updatedAt: result.updatedAt,
  customer: customerQueryResultToCustomer(result.customer),
  insuranceCarrier: insuranceCarrierQueryResultToInsuranceCarrier(
    result.insuranceCarrier
  ),
  groups: groupsQueryResultToGroups(result.groups),
  companyId: result.companyId,
  job: result.job,
});

const getChildGroups = (
  parentId: string,
  groups: InsuranceScopeWithMetaQueryResult['groups']
): InsuranceScopeGroupInfo[] =>
  groups
    .filter((g) => g.parentId === parentId)
    .map((g) => ({
      ...g,
      items: g.items.map(lineItemsQueryResultToLineItems),
      groups: getChildGroups(g.id, groups),
    }));

export const groupsQueryResultToGroups = (
  groups: InsuranceScopeWithMetaQueryResult['groups']
): InsuranceScopeGroupInfo[] => {
  const rootGroups = groups.filter((g) => !g.parentId);

  return rootGroups.map((group) => ({
    id: group.id,
    name: group.name,
    notes: group.notes,
    totalTax: group.totalTax,
    totalRCV: group.totalRCV,
    totalACV: group.totalACV,
    depreciation: group.depreciation,
    overhead: group.overhead,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    items: group.items.map(lineItemsQueryResultToLineItems),
    groups: getChildGroups(group.id, groups),
  }));
};

export const lineItemsQueryResultToLineItems = (
  item: InsuranceScopeLineItemViewModel
): InsuranceScopeLineItemInfo => ({
  id: item.id,
  description: item.description,
  sequence: item.sequence,
  notes: item.notes,
  quantity: item.quantity,
  unitOfMeasurement: item.unitOfMeasurement,
  unitPrice: item.unitPrice,
  tax: item.tax,
  overhead: item.overhead,
  rcv: item.rcv,
  acv: item.acv,
  ageLife: item.ageLife,
  condition: item.condition,
  depreciationPercentage: item.depreciationPercentage,
  depreciationSum: item.depreciationSum,
  isDepreciationRefundable: item.isDepreciationRefundable,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

export const customerQueryResultToCustomer = (
  customer: CustomerViewQueryResult
): CustomerInfo => ({
  id: customer.id,
  customerId: customer.customerId,
  displayName: customer.displayName,
  type: customer.type,
  firstName: customer.firstName,
  lastName: customer.lastName,
  email: customer.email,
  phone: customer.phone,
  propertyAddress: customer.propertyAddress,
  shippingAddress: customer.shippingAddress,
  createdAt: customer.createdAt,
  updatedAt: customer.updatedAt,
  responsibleUserIds: customer.responsibleUserIds,
  savedCustomer: customer.customer,
});

export const insuranceCarrierQueryResultToInsuranceCarrier = (
  carrier: InsuranceCarrierViewQueryResult
): InsuranceCarrierInfo => ({
  id: carrier.id,
  name: carrier.name,
  email: carrier.email,
  phone: carrier.phone,
  fax: carrier.fax,
  address: carrier.address,
  insuranceCarrierId: carrier.insuranceCarrierId,
  adjusters: insuranceCarrierAdjustersQueryResultToInsuranceCarrierAdjusters(
    carrier.adjusters
  ),
  createdAt: carrier.createdAt,
  updatedAt: carrier.updatedAt,
});

export const insuranceCarrierAdjustersQueryResultToInsuranceCarrierAdjusters = (
  adjusters: InsuranceCarrierViewQueryResult['adjusters']
): InsuranceCarrierAdjusterInfo[] =>
  adjusters.map((adjuster) => ({
    id: adjuster.id,
    name: adjuster.name,
    type: adjuster.type,
    phone: adjuster.phone,
    email: adjuster.email,
    address: adjuster.address,
    createdAt: adjuster.createdAt,
    updatedAt: adjuster.updatedAt,
  }));
