import { AgeLife, Item, ItemValue } from '@squaredash/shared/models';

import { HeaderType } from '../groups-extractor.constants';
import { typesToHandlers } from './types-to-handlers';

export class ItemExtractor {
  readonly item: Item;
  readonly unmatched: string[] = [];
  readonly toExtract: HeaderType[];

  constructor(
    readonly headerTypes: HeaderType[],
    protected readonly previousExtractor?: ItemExtractor | null
  ) {
    this.item = this.headerTypes
      .map((h) => typesToHandlers[h].fields)
      .reduce((acc, h) => (acc.push(...h), acc), [])
      .reduce(
        (acc, h) => (
          ((acc[h.field] as ItemValue | string | number | AgeLife | null) =
            h.defaultValue()),
          acc
        ),
        {
          index: 0,
          notes: new Array<string>(),
        } as Item
      );
    this.toExtract = this.headerTypes.slice(1);
  }

  private tryMatchExact(value: string): boolean {
    for (const headerType of [...this.toExtract]) {
      const handler = typesToHandlers[headerType];
      const result = handler.extract(value);

      if (result.matched && !result.before?.trim() && !result.after?.trim()) {
        this.toExtract.splice(this.toExtract.indexOf(headerType), 1);
        handler.format(this.item, result.matched);

        return true;
      }
    }

    return false;
  }

  private tryMatchAll(value: string) {
    let toMatch = value;

    for (const headerType of [...this.toExtract]) {
      if (!toMatch.length) return;

      const handler = typesToHandlers[headerType];
      const result = handler.extract(toMatch);

      if (result.matched) {
        if (result.before) {
          this.unmatched.push(result.before.trim());
        }
        toMatch = result.after?.trim() ?? '';
        this.toExtract.splice(this.toExtract.indexOf(headerType), 1);
        handler.format(this.item, result.matched);
      }
    }

    if (toMatch.length) {
      this.unmatched.push(toMatch);
    }
  }

  private tryMatchUnmatched() {
    if (!this.toExtract.length) return;

    const length = this.unmatched.length;
    let index = 0;

    while (index < length) {
      const u = this.unmatched.shift();
      if (u) this.tryMatchAll(u);
      index++;
    }
  }

  private tryMatchFromPrevious() {
    if (!this.toExtract.length || !this.previousExtractor?.unmatched.length)
      return;

    let index = 0;
    const length = this.previousExtractor.unmatched.length;

    while (index < length) {
      const u = this.previousExtractor.unmatched.shift();
      const matched = u && this.tryMatchExact(u);

      if (!matched && u) {
        this.previousExtractor.unmatched.push(u);
      }
      index++;
    }
  }

  private tryMatchDescription() {
    const length = this.unmatched.length;
    let index = 0;

    while (index < length) {
      const u = this.unmatched.shift();
      if (u) {
        const handler = typesToHandlers['description'];
        const result = handler.extract(u);

        if (result.before) {
          this.item.notes.push(result.before.trim());
        }

        if (result.matched) {
          handler.format(this.item, result.matched);
          break;
        }
      }
      index++;
    }
  }

  /*
   * When evaluating a row, the first column is evaluated last as it may be the description. The rest of the columns are evaluated by going over the expected regexes.
   */
  evaluateRow(row: string[]): void {
    row.forEach((c, index) => {
      if (index === 0) {
        this.unmatched.push(c); // Let's put the description here for now...
        return;
      }

      this.tryMatchAll(c);
    });
  }

  /*
   * The finalization step assumes that the row was already evaluated and serves as a fallback, in case the data was not well extracted from the original document.
     This step:
      - Goes over the list of unmatched text to check whether any of the missing columns can be found there
      - Goes over the previous extractor's unmatched text and does the same
      - Extracts the description from the unmatched text
      - Sets all the fields that were not extracted to null
   */
  finalizeRow() {
    this.tryMatchUnmatched();
    this.tryMatchFromPrevious();
    this.tryMatchDescription();

    /* Sets non extracted fields as null */
    this.toExtract
      .map((h) => typesToHandlers[h].fields)
      .reduce((acc, h) => (acc.push(...h), acc), [])
      .forEach((e) => {
        (this.item[e.field] as unknown) = null;
      });
  }

  /*
    This step should be executed after going over the tables once and simply moves any unmatched text into the item's notes
  */
  closeItem() {
    this.item.notes.push(
      ...this.unmatched.map((u) => u.trim()).filter((u) => u.length > 0)
    );
  }
}
