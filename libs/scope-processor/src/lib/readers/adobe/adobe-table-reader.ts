import { StructuredData } from '@squaredash/shared/apis/adobe-sdk';

import { headingNames } from '../../groups-extractor/constants/groups-list';
import { Bounds, DataElement } from '../../interfaces/data-element';
import { Table } from '../../interfaces/table';
import { AdobeReader } from './adobe-reader';

const MIN_COL_DISTANCE = 15;
const MIN_TEXT_SIZE = 8;
const totalsRx = /\s+(\d*,?\d*[.]?\d+)+/g;

interface AdobeColumn {
  left: number;
  right: number;
  name: string;
}

interface AdobeRow {
  top: number;
  bottom: number;
  page: number;
  cells: (AdobeCell | null)[];
}

interface AdobeCell {
  bounds: Bounds;
  value: string;
}

class AdobeTable {
  bounds: Bounds;
  columns: AdobeColumn[] = [];
  rows: AdobeRow[] = [];

  constructor(
    columns: DataElement[],
    readonly page: number,
    public precedingText: string[]
  ) {
    if (!columns[0].text.toUpperCase().includes('DESCRIPTION')) {
      this.columns.push({
        left: 0,
        right: columns[0].bounds.left - 10,
        name: 'DESCRIPTION',
      });
    }

    let top = 0;
    let bottom = 1000;

    columns.forEach((c) => {
      top = Math.max(top, c.bounds.top);
      bottom = Math.min(bottom, c.bounds.bottom);
      this.columns.push({
        left: c.bounds.left,
        right: c.bounds.right,
        name: c.text.trim(),
      });
    });

    this.bounds = {
      top,
      bottom,
      left: columns[0].bounds.left,
      right: columns[columns.length - 1].bounds.right,
    };
  }

  findRow({ bounds, page }: DataElement): AdobeRow | undefined {
    return this.rows.find(
      (r) =>
        r.page === page &&
        r.top + 0.5 >= bounds.top &&
        r.bottom + 5 < bounds.top
    );
  }

  findClosestRow({ bounds, page }: DataElement): number | undefined {
    const index = this.rows.findIndex(
      (row) => row.page === page && bounds.top > row.top
    );
    return index - 1;
  }

  findCol({ bounds }: DataElement): number {
    return this.columns.findIndex((c) => {
      if (c.left - 1 <= bounds.left && c.left + 1 >= bounds.left) return true;
      if (bounds.left >= c.left && bounds.left <= c.right) return true;
      if (c.right - 1 <= bounds.right && c.right + 1 >= bounds.right)
        return true;
      if (bounds.right <= c.right && bounds.right >= c.left) return true;

      if (bounds.left <= c.left && bounds.right >= c.right) return true;
      return false;
    });
  }

  addRow(data: DataElement): boolean {
    let row = this.findRow(data);
    let col = this.findCol(data);
    col = col === -1 ? 0 : col;

    /* console.log(
      row?.cells?.[0]?.value,
      row?.cells?.[0]?.bounds.right,
      data.text,
      data.bounds.top,
      data.bounds.bottom,
      data.bounds.left,
      data.bounds.right,
      col,
      row?.bottom,
      row?.top
    ); */

    if (!row) {
      row = {
        top: data.bounds.top,
        bottom: data.bounds.bottom,
        page: data.page,
        cells: this.columns.map(() => null),
      };
      this.rows.push(row);
      this.rows.sort((a, b) =>
        b.page === a.page ? b.bottom - a.bottom : a.page - b.page
      );
      this.bounds.bottom = Math.min(
        this.rows[this.rows.length - 1].bottom,
        this.bounds.bottom
      );
    }

    for (const cell of row.cells) {
      // Adds if in vicinity
      if (
        cell &&
        (Math.abs(cell.bounds.right - data.bounds.left) < MIN_COL_DISTANCE ||
          (data.bounds.left > cell.bounds.left &&
            data.bounds.left < cell.bounds.right))
      ) {
        cell.value += ` ${data.text.trim()}`;
        cell.bounds.right = data.bounds.right;

        return true;
      }
    }

    const curr = row.cells[col];

    if (!curr) {
      row.cells[col] = { bounds: data.bounds, value: data.text };
      return true;
    }

    curr.value += ` ${data.text.trim()}`;
    curr.bounds.right = data.bounds.right;

    return true;
  }
}

export class AdobeTableReader {
  private readonly reader: AdobeReader;

  constructor(readonly data: StructuredData) {
    this.reader = new AdobeReader(data);
  }

  /*
    Checks whether the current element is a header. This needs to take into account cases where more than one header is merged into a single element (Potentially the whole header row). It will iterate over a list of known headers and matches them with the element. If all of the element's text matches headers, then this is considered to be a header.
   */
  private checkIfHeader(element: DataElement): DataElement[] {
    const { bounds, page, text, textSize } = element;
    let toMatch = text.trim().toUpperCase();

    if (!toMatch.length) {
      return [];
    }

    const foundHeaders: string[] = [];
    headingNames.forEach((name) => {
      if (toMatch.includes(name)) {
        foundHeaders.push(name);
        toMatch = toMatch.replace(name, '').trim();
      }
    });

    if (!toMatch.length) {
      const width = (bounds.right - bounds.left) / foundHeaders.length;

      return foundHeaders.map((f, i) => ({
        text: f,
        bounds: {
          top: bounds.top,
          bottom: bounds.bottom,
          left: bounds.left + i * width,
          right: bounds.left + (i + 1) * width,
        },
        page,
        textSize,
      }));
    }

    return [];
  }

  /*
    Extracts the tables from the document. In this phase, tables
    that span through multiple pages are simply considered different tables.
    Any text that precedes the tables is considered a potential group and, therefore,
    stored.
    For text extracted within the bounds of the table, an attempt is made to calculate
    its proper row/column and added to the proper location in the table structure.
  */
  private extractTables(): AdobeTable[] {
    const tables: AdobeTable[] = [];
    let currentTable: AdobeTable | undefined;
    let currentHeaders: DataElement[] | undefined;
    let precedingText: string[] = [];

    this.reader.forEach((element) => {
      /* This avoids considering smaller text as part of the tables. Smaller text is usually present when
      the tables have a companion diagram. The problem with this text is that sometimes it has the same
      name as the groups and may mess up the whole group begin/close logic. */
      if (element.textSize < MIN_TEXT_SIZE) {
        return;
      }

      const possibleHeaders = this.checkIfHeader(element);
      if (possibleHeaders.length) {
        if (!currentHeaders) {
          currentHeaders = [...possibleHeaders];
        } else {
          currentHeaders.push(...possibleHeaders);
        }

        return;
      }

      if (element.text) {
        precedingText.push(element.text);
      }

      /* Has matched last header */
      if (currentHeaders && currentHeaders.length >= 4) {
        currentTable = new AdobeTable(
          currentHeaders,
          element.page,
          precedingText
        );
        tables.push(currentTable);
        precedingText = [];
      }

      currentHeaders = undefined;

      /* Tries to add a new row */
      if (currentTable) {
        currentTable.addRow(element);
      }
    });

    return tables;
  }

  /*
    This processing phase is already a bit of a mish-mash of domain concepts (Adobe SDK and Xactimate scope).
    We attempt to calculate the "true" tables. By that we mean:
     - Merge tables that are separated between pages
     - Understand which groups the tables are opening/closing (Using the preceding text and the "Totals" rows)
     - Make another pass to make sure we place as many cells as possible in the right place
    After this pass, we should have a clean set of tables.
  */
  private processTables(adbTables: AdobeTable[]): Table[] {
    const tables: Table[] = [];
    const openGroups: string[] = [];
    const validGroups: string[] = [];

    let currentTable: Table | undefined;
    let isFinalized = false;

    adbTables.forEach((adbTable) => {
      const { precedingText, columns, rows, page, bounds } = adbTable;

      openGroups.push(...precedingText);

      if (isFinalized || !currentTable) {
        currentTable = {
          headers: columns.map((c) => c.name),
          spatial: [{ page, bounds }],
          rows: [],
          beginsGroups: [...precedingText],
          closesGroups: [],
        };
        tables.push(currentTable);

        isFinalized = false;
      } else {
        currentTable.spatial.push({
          page: adbTable.page,
          bounds: adbTable.bounds,
        });
      }

      rows.forEach((adbRow) => {
        const cells: string[] = [];

        adbRow.cells.forEach((cell, index) => {
          if (index === 0 || !cell) {
            cells.push(cell?.value ?? '');
            return;
          }

          const prevCell = adbRow.cells[index - 1];
          if (!prevCell) {
            cells.push(cell?.value ?? '');
            return;
          }

          if (
            Math.abs(prevCell.bounds.right - cell.bounds.left) <=
            MIN_COL_DISTANCE
          ) {
            cells[index - 1] += ` ${cell.value}`;
            cells.push('');
            return;
          }

          cells.push(cell?.value ?? '');
        });

        if (
          adbRow.cells[0]?.value.startsWith('Totals: ') ||
          adbRow.cells[0]?.value.startsWith('Total: ')
        ) {
          isFinalized = true;

          const name = adbRow.cells[0]?.value
            .replace(/Total(s)?:\s/, '')
            .replace(totalsRx, '')
            .trim();

          if (name) {
            validGroups.push(name);

            const index = openGroups.indexOf(name);
            if (index === -1) {
              currentTable?.beginsGroups.push(name);
            } else {
              openGroups.splice(index, 1);
            }
          }

          currentTable?.closesGroups.push({
            name,
            row:
              cells
                .join(' ')
                .match(totalsRx)
                ?.map((m) => m.toString()) ?? [],
          });
        }

        if (!isFinalized) {
          currentTable?.rows.push(cells);
        }
      });
    });

    /* Cleans up groups */
    tables.forEach((t) => {
      const actualBegins: string[] = [];
      t.beginsGroups.forEach((b) => {
        const index = validGroups.indexOf(b);
        if (index !== -1) {
          actualBegins.push(b);
          validGroups.splice(index, 1);
        }
      });

      t.beginsGroups = actualBegins;
    });

    return tables;
  }

  extract(): Table[] {
    const extracted = this.extractTables();
    return this.processTables(extracted);
  }
}
