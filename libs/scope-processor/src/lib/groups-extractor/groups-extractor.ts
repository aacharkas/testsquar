import { StructuredData } from '@squaredash/shared/apis/adobe-sdk';
import { Group, Item, Totals } from '@squaredash/shared/models';
import { parseNumber } from '@squaredash/shared/util';

import { Table } from '../interfaces/table';
import { AdobeTableReader } from '../readers/adobe';
import {
  HeaderType,
  headersToTypes,
  typesToItemHeaders,
} from './groups-extractor.constants';
import { ItemExtractor } from './helpers/item-extractor';
import { typesToHandlers } from './helpers/types-to-handlers';

const printTables = (tables: Table[]) => {
  tables.forEach((t) => {
    console.log('\nTABLE\n');
    console.log(t.spatial);

    const str = t.headers.reduce((acc, h) => {
      acc += `[${h}]  `;
      return acc;
    }, '');

    console.log(`H -- ${str}`);

    t.rows.forEach((r, i) => {
      const str = r.reduce((acc, c) => {
        acc += `[${c ?? ''}]  `;
        return acc;
      }, '');

      console.log(`${i} -- ${str}`);
    });
  });
};

const closeGroup = (row: string[], totalsHeaders: string[], group: Group) => {
  if (!row?.length) {
    return;
  }

  const toCheck = row.join(' ').trim();
  if (!toCheck) {
    return group;
  }

  toCheck
    .split(' ')
    .map((j) => j.trim())
    .filter((j) => j.length && !isNaN(Number(j.replace(',', ''))))
    .forEach((cell, index) => {
      const header =
        index < totalsHeaders.length ? totalsHeaders[index] : undefined;
      if (!header) {
        return;
      }

      const type = headersToTypes[header][0];
      group.totals[type] = parseNumber(cell);
    });

  return group;
};

const getTotalsHeaders = (tables: Table[]) => {
  return tables[0].headers.filter(
    (header) =>
      header.includes('TAX') ||
      header.includes('RCV') ||
      header.includes('DEPREC') ||
      header.includes('ACV') ||
      header.includes('O&P')
  );
};

const getHeaderTypes = (tables: Table[]) => {
  return tables[0].headers
    .map((h) => {
      const type = headersToTypes[h];
      if (!type) {
        console.warn(`Unkown header: ${h}`);
      }
      return type;
    })
    .filter((t) => !!t)
    .reduce((acc, t) => (acc.push(...t), acc), []);
};

const getHeaders = (headerTypes: HeaderType[]) => {
  return [...new Set(headerTypes.map((t) => typesToItemHeaders[t]))];
};

const calculateTotals = (groups: Group[]): Totals => {
  const aggregateTotals = (acc: Totals, totals: Totals) => {
    Object.keys(totals).forEach((key) => {
      const value = totals[key];
      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] = Math.round((acc[key] + Number(value)) * 100) / 100;
    });
  };

  return groups.reduce((acc, g) => {
    if (g.items.length) {
      aggregateTotals(acc, g.totals);
    } else if (g.groups.length) {
      const totals = calculateTotals(g.groups);
      aggregateTotals(acc, totals);
    }
    return acc;
  }, {} as Totals);
};

/*
  This function will:
  - Extract a clean set of tables from Adobe reader
  - Create the final Group structure
  - Properly extract the values of each line item, with their proper types and structures
  - Properly extract the headers to be shown in the UI
*/
export const extractGroups = (
  data: StructuredData,
  debug = false
): { headers: (keyof Item)[]; groups: Group[]; totals: Totals } => {
  const reader = new AdobeTableReader(data);
  const tables = reader.extract();

  if (debug) {
    printTables(tables);
  }

  const openGroups: Group[] = [];
  const groups: Group[] = [];
  const totalsHeaders = getTotalsHeaders(tables);
  const headerTypes = getHeaderTypes(tables);
  const headers = getHeaders(headerTypes);

  tables.forEach((t) => {
    let current: ItemExtractor | null = null;
    const extractors: ItemExtractor[] = [];

    t.beginsGroups.forEach((name) => {
      const newGroup = { name, notes: [], items: [], groups: [], totals: {} };
      if (openGroups.length) {
        openGroups[openGroups.length - 1].groups.push(newGroup);
      } else {
        groups.push(newGroup);
      }

      openGroups.push(newGroup);
    });

    if (!openGroups.length) {
      const newGroup = {
        name: '',
        notes: [],
        items: [],
        groups: [],
        totals: {},
      };
      openGroups.push(newGroup);
      groups.push(newGroup);
    }

    const currentGroup: Group = openGroups[openGroups.length - 1];

    t.rows.forEach((r, ri) => {
      const descHandler = typesToHandlers['description'];
      const result = descHandler.extract(r[0]);

      if (result.matched) {
        if (current) {
          current.finalizeRow();
        }

        if (result.before) {
          currentGroup.notes?.push(result.before.trim());
        }

        const previousItem = current;
        current = new ItemExtractor(headerTypes, previousItem);
        extractors.push(current);
        currentGroup.items?.push(current.item);
        current.evaluateRow([result.matched, ...r.slice(1)]);

        if (ri === t.rows.length - 1) {
          current.finalizeRow();
        }

        return;
      }

      if (current) {
        current.evaluateRow(r);
        if (ri === t.rows.length - 1) {
          current.finalizeRow();
        }

        return;
      }

      currentGroup.notes?.push(
        ...r.map((u) => u.trim()).filter((u) => u.length > 0)
      );
    });

    /* Executes any final actions on the items */
    extractors.forEach((e) => e.closeItem());

    if (currentGroup && t.closesGroups.length) {
      t.closesGroups.forEach(({ row }) => {
        const group = openGroups.pop();
        if (group) {
          closeGroup(row, totalsHeaders, group);
        }
      });
    }
  });

  const totals = calculateTotals(groups);

  return { headers, groups, totals };
};
