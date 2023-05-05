import { StructuredData } from '@squaredash/shared/apis/adobe-sdk';

import {
  findKnownTerm,
  ignorePageTerms,
} from '../../details-extractor/constants/term-list';
import {
  getAllMatches,
  getFirstMatch,
} from '../../details-extractor/helpers/format-matchers';
import { Bounds } from '../../interfaces/data-element';
import {
  ExtractedElement,
  ExtractedKey,
  ExtractedValue,
} from '../../interfaces/extracted-element';

/*
 * Extracts all the relevant key-value pairs in 4 steps:
 * - First step simply goes to the intended page, extracts all known terms that end with ":" as keys and the rest as values. It also attempts to detect wether a given value matches a certain format, like a phone number, an email or an address;
 * - The second step will make a first attempt at matching keys with their respective values. It takes into account the position (bounds) of the keys and the values and whether the key expects a certain kind of value format;
 * - The third step will attempt to cover cases where values of a given format are separated in different lines or pieces of text (for instance, an address that is separated in 2 lines). It will try to merge values and detect whether, while merged, they belong to a given format. If that is the case, we leave them merged;
 * - The last step will make a second attempt at matching the keys with the values. The behaviour is exactly the same as the second step, with the difference being that it'll now have the merged values to work with.
 */
export const readKeyValues = (data: StructuredData, page: number) => {
  let extracted = extractPossibleKeyValues(data, page);
  extracted = matchKeysToValues(extracted);
  extracted = mergeComplexValues(extracted);
  extracted = matchKeysToValues(extracted);

  return extracted.filter((e) => e.type === 'value') as ExtractedValue[];
};

export const getPageCount = (data: StructuredData) => {
  return data.extended_metadata.page_count;
};

const MAX_KV_SPACE = 50;
const MAX_NEW_LINE_SPACE = 10;

const isNextTo = (first: Bounds, second: Bounds): boolean =>
  second.top >= first.bottom &&
  second.bottom <= first.top &&
  // Takes into account cases where Adobe calculated the same bounds for both key and value
  (second.left - first.right < MAX_KV_SPACE ||
    (first.left === second.left && first.right === second.right));

const isBelow = (first: Bounds, second: Bounds): boolean =>
  second.left <= first.right &&
  second.right >= first.left &&
  Math.abs(first.bottom - second.top) < MAX_NEW_LINE_SPACE;

const extractValueInto = (
  text: string,
  bounds: Bounds,
  extracted: ExtractedElement[]
) => {
  const toExtract = text.trim();

  if (!toExtract.length) {
    return;
  }

  const parts = getAllMatches(toExtract);
  parts.forEach(({ value, format }) => {
    extracted.push({
      type: 'value',
      value,
      bounds,
      format,
    } as ExtractedValue);
  });
};

const matchKeysToValues = (
  extracted: ExtractedElement[]
): ExtractedElement[] => {
  const ignore: ExtractedElement[] = [];
  return extracted.reduce((acc, element, index) => {
    if (ignore.includes(element)) return acc;

    if (element.type === 'value') {
      acc.push(element);
      return acc;
    }

    const key = element as ExtractedKey;

    const value = extracted.find(
      (el, i) =>
        i > index &&
        el.type === 'value' &&
        isNextTo(key.bounds, el.bounds) &&
        !ignore.includes(el)
    ) as ExtractedValue;

    if (
      (value?.format && key.term?.formats?.includes(value.format)) ||
      (value && !value.format && !key.term?.formats?.length)
    ) {
      acc.push({
        ...value,
        key: key.value,
        bounds: key.bounds,
        group: key.term?.group,
        property: key.term?.property,
      } as ExtractedValue);
      ignore.push(value);
      return acc;
    }

    acc.push(key);
    return acc;
  }, [] as ExtractedElement[]);
};

const mergeComplexValues = (
  extracted: ExtractedElement[]
): ExtractedElement[] => {
  const ignore: ExtractedElement[] = [];
  return extracted.reduce((acc, element, index) => {
    if (ignore.includes(element)) return acc;

    if (element.type === 'key') {
      acc.push(element);
      return acc;
    }

    const ext = element as ExtractedValue;
    if (ext.format || ext.key) {
      acc.push(element);
      return acc;
    }

    const next = extracted.find(
      (el, i) =>
        i > index &&
        el.type === 'value' &&
        !(el as ExtractedValue).key &&
        !ignore.includes(el) &&
        (isNextTo(ext.bounds, el.bounds) || isBelow(ext.bounds, el.bounds))
    ) as ExtractedValue;

    if (!next || next.format) {
      acc.push(element);
      return acc;
    }

    const merged = ext.value + ` ${next.value}`;

    const result = getFirstMatch(merged);
    if (result) {
      acc.push({
        ...ext,
        value: merged,
        format: result.format,
      } as ExtractedValue);
      ignore.push(next);
      return acc;
    }

    if (isNextTo(ext.bounds, next.bounds)) {
      // Should have been merged, anyway...
      acc.push({ ...ext, value: merged } as ExtractedValue);
      ignore.push(next);
      return acc;
    }

    acc.push(ext);
    return acc;
  }, [] as ExtractedElement[]);
};

const extractPossibleKeyValues = (
  data: StructuredData,
  page: number
): ExtractedElement[] => {
  const extracted: ExtractedElement[] = [];

  data.elements
    .filter(
      (e) =>
        e.Page === page &&
        !!e.Text &&
        !ignorePageTerms.some((t) => e.Text?.toUpperCase().includes(t))
    )
    .forEach((element) => {
      const text = element.Text ?? '';
      const bounds = {
        left: element.Bounds?.[0] ?? 0,
        bottom: element.Bounds?.[1] ?? 0,
        right: element.Bounds?.[2] ?? 0,
        top: element.Bounds?.[3] ?? 0,
      };

      if (text.includes(': ')) {
        let prevText = '';
        const parts = text.split(': ');

        for (let i = 0; i < parts.length - 1; i++) {
          const toAdd = parts[i].trim();
          if (!toAdd.length) continue;

          const match = findKnownTerm(toAdd);
          if (match) {
            prevText = match.index > 0 ? toAdd.substring(0, match.index) : '';
            extractValueInto(prevText, bounds, extracted);

            extracted.push(
              new ExtractedKey({ value: match.value, term: match, bounds })
            );
            continue;
          }

          extracted.push(new ExtractedKey({ value: toAdd, bounds }));
        }

        if (parts.length) {
          extractValueInto(parts[parts.length - 1], bounds, extracted);
        }

        return;
      }

      extractValueInto(text, bounds, extracted);
    });

  return extracted;
};
