import { CustomerType } from '@prisma/client';
import moment from 'moment';

import { AdjusterType } from '@squaredash/crud/insurance-carrier-adjuster-draft';
import { InsuranceScopeListItem } from '@squaredash/crud/insurance-scope';
import {
  Group,
  Item,
  Record,
  ScopeContent,
  Summary,
} from '@squaredash/shared/models';

export const getLineItemPayload = (
  scopeId: string,
  item: Item
): LineItemDraftInfo => {
  // Fix for SQ-875
  // Value for  for isRefundable is false is depreciation has null/0 value
  const depreciationSum = item.depreciation?.value
    ? Number(item.depreciation?.value)
    : 0;

  return {
    description: item.description,
    sequence: item.index,
    notes: item.notes.join(', '),
    quantity: item.quantity?.value ? Number(item.quantity?.value) : 0,
    unitOfMeasurement: item.quantity?.units,
    unitPrice: item.unitPrice,
    tax: item.tax,
    overhead: item.overhead,
    rcv: item.rcv,
    acv: item.acv,
    ageLife: item.ageLife
      ? `${item.ageLife.age}/${item.ageLife.life} ${item.ageLife.units}`
      : null,
    condition: item.condition,
    // Temporary, algo in some cases returns null instead of 0
    depreciationPercentage: item.depreciation?.percentage || 0,
    depreciationSum,
    isDepreciationRefundable: depreciationSum > 0,
  };
};

export const getGroupInfos = (
  scopeId: string,
  group: Group
): GroupDraftInfo => ({
  name: group.name,
  notes: group.notes.join(', '),
  items: group.items.map((item) => getLineItemPayload(scopeId, item)),
  groups: group.groups.map((group) => getGroupInfos(scopeId, group)),
  totalTax: group.totals?.tax,
  totalRCV: group.totals?.rcv,
  totalACV: group.totals?.acv,
  depreciation: group.totals?.depreciation,
  overhead: group.totals?.overhead,
});

export const getCustomerPayload = (customer: Record): CustomerDraftInfo => {
  const propertyAddress = customer?.addresses?.find(
    (a) => a.type === 'Property'
  );
  const shippingAddress = customer?.addresses?.find((a) => a.type === 'Home');
  const phone = customer?.phones?.[0];

  return {
    displayName: customer?.name,
    type: CustomerType.INDIVIDUAL,
    firstName: undefined,
    lastName: undefined,
    email: customer?.emails[0]?.value,
    phone: phone?.value?.replace(/[^\d]+/g, ''),
    propertyAddress: propertyAddress?.value,
    shippingAddress: shippingAddress?.value,
  };
};

export const getInsuranceScopePayload = (
  content: ScopeContent
): InsuranceScopeDraftInfo => {
  return {
    claimNumber: content.claim?.claimNumber,
    typeOfLoss: content.claim?.typeOfLoss,
    dateOfLoss: content.dates?.dateOfLoss
      ? moment(content.dates.dateOfLoss, 'MM/DD/YYYY').toDate()
      : undefined,
    dateInspected: content.dates?.dateInspected
      ? moment(content.dates.dateInspected, 'MM/DD/YYYY').toDate()
      : undefined,
    dateContacted: content.dates?.dateContacted
      ? moment(content.dates.dateContacted, 'MM/DD/YYYY').toDate()
      : undefined,
    dateReceived: content.dates?.dateReceived
      ? moment(content.dates.dateReceived, 'MM/DD/YYYY').toDate()
      : undefined,
    dateEntered: content.dates?.dateEntered
      ? moment(content.dates.dateEntered, 'MM/DD/YYYY').toDate()
      : undefined,
    policyNumber: content.claim?.policyNumber,
    priceList: content.claim?.priceList,
    ...getScopeTotals(content.summaries),
  };
};

export const getInsuranceCarrierAdjusterType = (type?: string): AdjusterType =>
  type === 'Estimator' ? AdjusterType.ESTIMATOR : AdjusterType.CLAIM_REP;

export const getInsuranceCarrierAdjustersInfo = (
  insuranceCarrierDraftId,
  adjusters: Record[]
): InsuranceCarriedAdjusterDraftInfo[] =>
  adjusters.map((adjuster) => ({
    insuranceCarrierDraftId,
    name: adjuster?.name,
    type: getInsuranceCarrierAdjusterType(adjuster?.type),
    phone: adjuster?.phones[0]?.value?.replace(/[^\d]+/g, ''),
    email: adjuster?.emails[0]?.value,
    address: adjuster?.addresses[0]?.value,
  }));

export const getInsuranceCarrierInfo = (
  company: Record
): InsuranceCarriedDraftInfo => {
  const address = company?.addresses?.[0];
  const phone = company?.phones[0];
  const fax = company?.phones.find((p) => p.type === 'Fax');
  const email = company?.emails[0];

  return {
    name: company?.name,
    email: email?.value,
    phone: phone?.value?.replace(/[^\d]+/g, ''),
    fax: fax?.value?.replace(/[^\d]+/g, ''),
    address: address?.value,
  };
};

export const getImportResponse = (
  insuranceScope,
  customer,
  insuranceCarrier
): InsuranceScopeListItem => ({
  id: insuranceScope.id,
  dateOfLoss: insuranceScope.dateOfLoss,
  claimNumber: insuranceScope.claimNumber,
  customerName: customer.displayName,
  propertyAddress: customer.propertyAddress,
  insuranceCarrierName: insuranceCarrier.name,
  rcv: insuranceScope.totalRcv,
  deductible: insuranceScope.deductible,
  status: insuranceScope.status,
  versionId: insuranceScope.versionId,
  createdAt: insuranceScope.createdAt,
  companyName: insuranceCarrier.companyName,
});

export const getScopeTotals = (summaries: Summary[]): InsuranceScopeTotals => {
  const visitedSummaries = new Set();
  return summaries.reduce(
    (totals, summary) => {
      if (visitedSummaries.has(summary.title)) {
        return totals;
      }

      visitedSummaries.add(summary.title);

      const lineItemTotal = summary.summaries.find(
        (s) => s.title === 'LineItemTotal'
      );
      totals.totalLineItems += lineItemTotal?.value || 0;

      const totalTax = summary.summaries.find(
        (s) => s.title === 'MaterialSalesTax'
      );
      totals.totalTax += totalTax?.value || 0;

      const totalRcv = summary.summaries.find(
        (s) => s.title === 'ReplacementCostValue'
      );
      totals.totalRcv += totalRcv?.value || 0;

      const totalDepreciation = summary.summaries.find(
        (s) =>
          s.title === 'LessDepreciation' ||
          s.title === 'LessDepreciationIncludingTaxes'
      );
      totals.totalDepreciation += totalDepreciation?.value || 0;

      const deductible = summary.summaries.find(
        (s) => s.title === 'LessDeductible'
      );
      totals.deductible += deductible?.value || 0;

      const totalAcv = summary.summaries.find(
        (s) => s.title === 'ActualCashValue'
      );
      totals.totalAcv += totalAcv?.value || 0;

      const netClaimSum = summary.summaries.find(
        (s) => s.title === 'NetClaim' || s.title === 'NetActualCashValuePayment'
      );
      totals.netClaimSum += netClaimSum?.value || 0;

      const totalRecoverableDepreciationSum = summary.summaries.find(
        (s) => s.title === 'TotalRecoverableDepreciation'
      );
      totals.totalRecoverableDepreciationSum +=
        totalRecoverableDepreciationSum?.value || 0;

      const totalNonRecoverableDepreciationSum = summary.summaries.find(
        (s) => s.title === 'LessNonrecoverableDepreciation'
      );
      totals.totalNonRecoverableDepreciationSum +=
        totalNonRecoverableDepreciationSum?.value || 0;

      const netClaimIfDepreciationIsRecovered = summary.summaries.find(
        (s) =>
          s.title === 'NetClaimifDepreciationisRecovered' ||
          s.title === 'TotalAmountofClaimIfIncurred'
      );
      totals.netClaimIfDepreciationIsRecovered +=
        netClaimIfDepreciationIsRecovered?.value || 0;

      const totalOverhead = summary.summaries.find(
        (s) => s.title === 'Overhead'
      );
      totals.totalOverhead += totalOverhead?.value || 0;

      return totals;
    },
    {
      totalLineItems: 0,
      totalTax: 0,
      totalRcv: 0,
      totalAcv: 0,
      totalOverhead: 0,
      totalDepreciation: 0,
      deductible: 0,
      netClaimSum: 0,
      totalRecoverableDepreciationSum: 0,
      totalNonRecoverableDepreciationSum: 0,
      netClaimIfDepreciationIsRecovered: 0,
    }
  );
};

interface InsuranceCarriedAdjusterDraftInfo {
  insuranceCarrierDraftId: string;
  type: AdjusterType;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface InsuranceCarriedDraftInfo {
  name?: string;
  email?: string;
  phone?: string;
  fax?: string;
  address?: string;
}

interface InsuranceScopeTotals {
  totalLineItems?: number;
  totalTax?: number;
  totalRcv?: number;
  totalAcv?: number;
  totalOverhead?: number;
  totalDepreciation?: number;
  deductible?: number;
  netClaimSum?: number;
  totalRecoverableDepreciationSum?: number;
  totalNonRecoverableDepreciationSum?: number;
  netClaimIfDepreciationIsRecovered?: number;
}

interface InsuranceScopeDraftInfo extends InsuranceScopeTotals {
  claimNumber?: string;
  typeOfLoss?: string;
  dateOfLoss?: Date;
  dateInspected?: Date;
  dateContacted?: Date;
  dateReceived?: Date;
  dateEntered?: Date;
  policyNumber?: string;
  priceList?: string;
}

interface LineItemDraftInfo {
  description: string;
  sequence: number;
  notes: string;
  quantity?: number;
  unitOfMeasurement?: string;
  unitPrice?: number;
  tax?: number;
  overhead?: number;
  rcv?: number;
  acv?: number;
  ageLife?: string;
  condition?: string;
  depreciationPercentage?: number;
  depreciationSum?: number;
  isDepreciationRefundable?: boolean;
}

interface CustomerDraftInfo {
  displayName?: string;
  type: CustomerType;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  shippingAddress?: string;
}

interface GroupDraftInfo {
  name: string;
  notes: string;
  items: LineItemDraftInfo[];
  groups: GroupDraftInfo[];
  totalTax?: number;
  totalRCV?: number;
  totalACV?: number;
  depreciation?: number;
  overhead?: number;
}
