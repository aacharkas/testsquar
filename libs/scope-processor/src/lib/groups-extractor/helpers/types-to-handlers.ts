import { AgeLife, Item, ItemValue } from '@squaredash/shared/models';

import { HeaderType } from '../groups-extractor.constants';
import {
  ExtractionResult,
  HeaderHandler,
} from '../groups-extractor.interfaces';

const patterns: { [key: string]: RegExp } = {
  description: /(^|\s)([0-9]+\.\s+.*)/,
  quantity: /([0-9]*,?[0-9]+[.][0-9]{2}\s?[A-Z]{2})/,
  ageLife: /([0-9]+\/(([0-9]+\syrs)|NA))|(NA)/,
  condition: /(Avg\.)|(Below Avg\.)|(NA)/,
  depreciation: /([(<)]+[0-9]*,?[0-9]*[.]?[0-9]+[)>)]+)/,
  depPercent: /((([0-9]*,?[0-9]*[.]?[0-9]+%)|(NA))(\s\[[A-Z]\])?)/,
  number: /([0-9]*,?[0-9]+[.][0-9]{2})/,
};

const regexExtract = (regex: RegExp, value: string): ExtractionResult => {
  const result: ExtractionResult = { original: value };

  const match = value.match(regex);
  if (!match) {
    result.before = value;
    return result;
  }

  result.matched = match[0];

  result.before = value.substring(0, match.index ?? 0);
  result.after = value.substring((match.index ?? 0) + result.matched.length);

  return result;
};

const defaultFormatter = (
  item: Item,
  header: keyof Item,
  value: string
): void => {
  if (value === 'NA') {
    (item[header] as unknown) = null;
    return;
  }

  (item[header] as string) = value?.trim() ?? '';
};

const floatFormatter = (
  item: Item,
  header: keyof Item,
  value: string
): void => {
  if (value === 'NA') return;
  (item[header] as number) = parseFloat(value.replace(',', ''));
};

export const typesToHandlers: {
  [key in HeaderType]: HeaderHandler;
} = {
  description: {
    type: 'description',
    fields: [{ field: 'description', defaultValue: () => '' }],
    extract: (value) => regexExtract(patterns.description, value),
    format: (item: Item, value: string) => {
      const idx = Number(value.split('.')[0]);

      item.index = isNaN(idx) ? 0 : idx;
      item.description = isNaN(idx)
        ? value
        : value.replace(`${idx}.`, '').trim();
    },
  },
  quantity: {
    type: 'quantity',
    fields: [{ field: 'quantity', defaultValue: () => ({ value: 0 }) }],
    extract: (value) => regexExtract(patterns.quantity, value),
    format: (item: Item, value: string): void => {
      item.quantity = {
        value: parseFloat(
          value.substring(0, value.length - 2).replace(',', '')
        ),
        units: value.substring(value.length - 2, value.length),
      };
    },
  },
  unitPrice: {
    type: 'unitPrice',
    fields: [{ field: 'unitPrice', defaultValue: () => 0 }],
    extract: (value) => regexExtract(patterns.number, value),
    format: (item: Item, value: string) =>
      floatFormatter(item, 'unitPrice', value),
  },
  ageLife: {
    type: 'ageLife',
    extract: (value) => regexExtract(patterns.ageLife, value),
    fields: [{ field: 'ageLife', defaultValue: () => ({} as AgeLife) }],
    format: (item: Item, value: string): void => {
      if (value === 'NA') {
        item.ageLife = null;
        return;
      }

      const valuesAndUnits = value.split(' ');
      const units =
        valuesAndUnits.length > 1 && valuesAndUnits[1].trim().length
          ? valuesAndUnits[1].trim()
          : 'yrs';

      const ageLife = valuesAndUnits[0].split('/');
      item.ageLife = {
        age: Number(ageLife[0]),
        life: ageLife[1] !== 'NA' ? Number(ageLife[1]) : null,
        units,
      };
    },
  },
  condition: {
    type: 'condition',
    fields: [{ field: 'condition', defaultValue: () => 'Avg.' }],
    extract: (value) => regexExtract(patterns.condition, value),
    format: (item: Item, value: string) =>
      defaultFormatter(item, 'condition', value),
  },
  depreciation: {
    type: 'depreciation',
    fields: [
      {
        field: 'depreciation',
        defaultValue: () => ({ value: 0, isRefundable: true }),
      },
    ],
    extract: (value) => regexExtract(patterns.depreciation, value),
    format: (item: Item, value: string) => {
      if (!value?.length) return;
      const depreciation = item.depreciation as ItemValue;
      depreciation.value = parseFloat(
        value.substring(1, value.length - 1).replace(',', '')
      );
      depreciation.isRefundable = value.startsWith('(');
    },
  },
  depPercent: {
    type: 'depPercent',
    extract: (value) => regexExtract(patterns.depPercent, value),
    fields: [
      {
        field: 'depreciation',
        defaultValue: () => ({ value: 0, isRefundable: true }),
      },
    ],
    format: (item: Item, value: string) => {
      if (!value.length || value === 'NA') return;
      const depreciation = item.depreciation as ItemValue;
      depreciation.percentage = parseFloat(
        value.substring(0, value.indexOf('%'))
      );
    },
  },
  tax: {
    type: 'tax',
    fields: [{ field: 'tax', defaultValue: () => 0 }],
    extract: (value) => regexExtract(patterns.number, value),
    format: (item: Item, value: string) => floatFormatter(item, 'tax', value),
  },
  rcv: {
    type: 'rcv',
    fields: [{ field: 'rcv', defaultValue: () => 0 }],
    extract: (value) => regexExtract(patterns.number, value),
    format: (item: Item, value: string) => floatFormatter(item, 'rcv', value),
  },
  acv: {
    type: 'acv',
    fields: [{ field: 'acv', defaultValue: () => 0 }],
    extract: (value) => regexExtract(patterns.number, value),
    format: (item: Item, value: string) => floatFormatter(item, 'acv', value),
  },
  overhead: {
    type: 'overhead',
    fields: [{ field: 'overhead', defaultValue: () => 0 }],
    extract: (value) => regexExtract(patterns.number, value),
    format: (item: Item, value: string) =>
      floatFormatter(item, 'overhead', value),
  },
};
