import { StructuredData } from '@squaredash/shared/apis/adobe-sdk';
import {
  ClaimInfo,
  Dates,
  Record,
  ScopeDetails,
} from '@squaredash/shared/models';

import { ExtractedValue } from '../interfaces/extracted-element';
import { getPageCount, readKeyValues } from '../readers/adobe';
import { findCompanyByTerm } from './constants/company-list';

type PositionedRecord = Record & {
  top: number;
  bottom: number;
  group: keyof ScopeDetails;
};

const DELTA = 15;
const MAX_BOTTOM_DISTANCE = 50;

export const extractDetails = (data: StructuredData): ScopeDetails => {
  let tmpCompany: PositionedRecord | undefined;
  const tmpRecords: PositionedRecord[] = [];
  const tmpDates: Dates = {};
  const tmpClaim: ClaimInfo = {};

  const isDetailsPage = (kv: ExtractedValue[]): boolean => {
    const customers = kv.find((v) => v.group === 'customers');
    const dates = kv.find((v) => v.group === 'dates');
    const claim = kv.find((v) => v.group === 'claim');
    return !!customers && !!dates && !!claim;
  };

  const isCompanyPage = (kv: ExtractedValue[]): boolean => {
    const found = kv.find(
      (v) => !!findCompanyByTerm(v.value) && v.bounds.top > 500
    );
    return !!found;
  };

  const findRecordForPosition = (top: number): PositionedRecord | null => {
    const found = tmpRecords.filter(
      (r) => r.top + DELTA >= top && r.bottom - top < MAX_BOTTOM_DISTANCE
    );
    if (found) {
      return found[found.length - 1];
    }
    return null;
  };

  const addRecord = ({ key, value, bounds, group }: ExtractedValue): void => {
    if (!group) {
      return;
    }

    tmpRecords.push({
      group,
      type: key ?? group,
      name: value,
      phones: [],
      emails: [],
      addresses: [],
      top: bounds.top,
      bottom: bounds.bottom,
    });
    tmpRecords.sort((a, b) => b.top - a.top);
  };

  const addToRecord = (
    record: PositionedRecord,
    { key, value, format, bounds }: ExtractedValue
  ) => {
    const newBottom = Math.min(record.bottom, bounds.bottom);

    if (format === 'email') {
      record.emails.push({
        type: key ?? 'E-mail',
        value: value.replace(/\s+/g, ''),
      });
      record.bottom = newBottom;
    } else if (format === 'phone') {
      record.phones.push({ type: key ?? 'Phone', value: value });
      record.bottom = newBottom;
    } else if (format === 'address') {
      record.addresses.push({ type: key ?? 'Address', value: value });
      record.bottom = newBottom;
    }
  };

  const tryReadDetails = (item: ExtractedValue) => {
    if (item.group === 'customers' || item.group === 'adjusters') {
      addRecord(item);
      return;
    }

    if (item.group === 'companies' && !tmpCompany) {
      tmpCompany = {
        type: 'Insurance Company',
        name: item.value,
        phones: [],
        emails: [],
        addresses: [],
        top: item.bounds.top,
        bottom: item.bounds.bottom,
        group: 'companies',
      };
      return;
    }

    if (item.property) {
      if (item.group === 'dates') {
        tmpDates[item.property as keyof Dates] = item.value;
        return;
      }

      if (item.group === 'claim') {
        tmpClaim[item.property as keyof ClaimInfo] = item.value;
        return;
      }
    }

    if (!item.group) {
      const record = findRecordForPosition(item.bounds.top);
      if (record) {
        addToRecord(record, item);
      }
    }
  };

  const tryReadCompany = (item: ExtractedValue) => {
    if (!tmpCompany) {
      const companyName = findCompanyByTerm(item.value);

      if (companyName) {
        tmpCompany = {
          type: 'Insurance Company',
          name: companyName,
          phones: [],
          emails: [],
          addresses: [],
          top: item.bounds.top,
          bottom: item.bounds.bottom,
          group: 'companies',
        };
      }

      return;
    }

    if (
      tmpCompany.bottom - item.bounds.top > MAX_BOTTOM_DISTANCE ||
      (tmpRecords.length
        ? tmpRecords[0].top + DELTA > item.bounds.top
        : item.bounds.top < 500)
    ) {
      return;
    }

    addToRecord(tmpCompany, item);
  };

  let foundCompany = false;
  let foundDetails = false;
  let page = 0;
  const pages = getPageCount(data);

  while (page < pages && (!foundCompany || !foundDetails)) {
    const kv = readKeyValues(data, page);
    const isDetails = isDetailsPage(kv);
    if (isDetails) {
      foundDetails = true;
    }

    const isCompany = isCompanyPage(kv);
    if (isCompany) {
      foundCompany = true;
    }

    for (const item of kv) {
      if (isCompany) {
        tryReadCompany(item);
      }

      if (isDetails) {
        tryReadDetails(item);
      }
    }

    page++;
  }

  const result: ScopeDetails = {
    customers: tmpRecords
      .filter((r) => r.group === 'customers')
      .map(({ top, bottom, group, ...c }) => ({ ...c })),
    adjusters: tmpRecords
      .filter((r) => r.group === 'adjusters')
      .map(({ top, bottom, group, ...a }) => ({ ...a })),
    companies: [],
    dates: tmpDates,
    claim: tmpClaim,
  };

  if (tmpCompany) {
    const { top, bottom, group, ...c } = tmpCompany;
    result.companies.push(c);
  }

  return result;
};
