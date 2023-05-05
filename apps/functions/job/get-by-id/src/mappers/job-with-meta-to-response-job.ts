import { JobWithMeta } from '@squaredash/job';
import { ArrayElement } from '@squaredash/shared/util';

import {
  ResponseAdjuster,
  ResponseCustomer,
  ResponseGroup,
  ResponseInsuranceCarrier,
  ResponseJob,
  ResponseLineItem,
} from '../models/response-job';

export const jobWithMetaToResponseJob = (job: JobWithMeta): ResponseJob => ({
  id: job.id,
  claimNumber: job.claimNumber,
  typeOfLoss: job.typeOfLoss,
  dateOfLoss: job.dateOfLoss,
  policyNumber: job.policyNumber,
  priceList: job.priceList,
  status: job.status,
  totalLineItems: job.totals.lineItemsTotal,
  totalTax: job.totals.totalTax,
  totalRcv: job.totals.totalRCV,
  totalAcv: job.totals.totalACV,
  totalOverhead: job.totals.totalOverheadAndProfit,
  totalDepreciation: job.totals.totalDepreciationSum,
  deductible: job.totals.deductible,
  netClaimSum: job.totals.netClaimItem,
  totalRecoverableDepreciationSum: job.totals.totalRecoverableDepreciationSum,
  totalNonRecoverableDepreciationSum:
    job.totals.totalNonRecoverableDepreciationSum,
  netClaimIfDepreciationIsRecovered:
    job.totals.netClaimIfDepreciationIsRecovered,
  groups: jobGroupsToResponseGroups(job.groups),
  customer: jobCustomerToResponseCustomer(job.customer),
  insuranceCarrier: jobCarrierToResponseCarrier(job.insuranceCarrier),
  companyId: job.insuranceScope.companyId,
  insuranceScopeId: job.insuranceScopeId,
});

export const jobGroupsToResponseGroups = (
  groups: JobWithMeta['groups']
): ResponseGroup[] => {
  const parentGroups = groups.filter((group) => !group.parentId);

  return parentGroups.map((group) => ({
    id: group.id,
    name: group.name,
    notes: group.notes,
    totalTax: group.totalTax,
    totalRCV: group.totalRCV,
    totalACV: group.totalACV,
    depreciation: group.totalDepreciationSum,
    overhead: group.totalOverheadAndProfit,
    groups: getChildGroups(group.id, groups),
    items: jobLineItemsToResponseLineItems(group.lineItems),
  }));
};

export const getChildGroups = (
  groupId: string,
  groups: JobWithMeta['groups']
): ResponseGroup[] => {
  const childGroups = groups.filter((group) => group.parentId === groupId);

  return childGroups.map((group) => ({
    id: group.id,
    name: group.name,
    notes: group.notes,
    totalTax: group.totalTax,
    totalRCV: group.totalRCV,
    totalACV: group.totalACV,
    depreciation: group.totalDepreciationSum,
    overhead: group.totalOverheadAndProfit,
    groups: getChildGroups(group.id, groups),
    items: jobLineItemsToResponseLineItems(group.lineItems),
  }));
};

export const jobCustomerToResponseCustomer = (
  jobCustomer: JobWithMeta['customer']
): ResponseCustomer => ({
  id: jobCustomer.id,
  propertyAddress: jobCustomer.propertyAddress.formattedAddress,
  displayName: jobCustomer.customer.displayName,
  firstName: jobCustomer.customer.firstName,
  lastName: jobCustomer.customer.lastName,
  phone: jobCustomer.customer.phone,
  shippingAddress: jobCustomer.customer.shippingAddress.formattedAddress,
  email: jobCustomer.customer.email,
});

export const jobCarrierToResponseCarrier = (
  carrier: JobWithMeta['insuranceCarrier']
): ResponseInsuranceCarrier => ({
  id: carrier.id,
  email: carrier.email,
  phone: carrier.phoneNumber,
  displayName: carrier.insuranceCarrier.name,
  adjusters: jobAdjustersToResponseAdjusters(carrier.adjusters),
});

export const jobAdjustersToResponseAdjusters = (
  adjusters: JobWithMeta['insuranceCarrier']['adjusters']
): ResponseAdjuster[] =>
  adjusters.map((adjuster) => ({
    id: adjuster.id,
    name: adjuster.name,
    type: adjuster.type,
    phone: adjuster.phoneNumber,
    email: adjuster.email,
  }));

export const jobLineItemsToResponseLineItems = (
  items: ArrayElement<JobWithMeta['groups']>['lineItems']
): ResponseLineItem[] =>
  items.map((item) => ({
    id: item.id,
    description: item.description,
    sequence: item.sequenceNumber,
    notes: item.notes,
    quantity: item.quantity,
    unitOfMeasurement: item.unitOfMeasurement.abbreviation,
    unitPrice: item.unitPrice,
    tax: item.tax,
    overhead: item.overheadAndProfit,
    rcv: item.rcv,
    acv: item.acv,
    depreciationPercentage: item.depreciation,
    depreciationSum: item.depreciationSum,
    isDepreciationRefundable: item.isDepreciationRecoverable,
    includedInJob: item.includedInJob,
  }));
