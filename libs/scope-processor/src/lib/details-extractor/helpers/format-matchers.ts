import {
  FormatMatch,
  PartialFormatMatch,
  TermFormat,
} from '../../interfaces/terms';

const matchesRegexList = (regexes: RegExp[], value: string): string | null => {
  for (const regex of regexes) {
    const matches = value.match(regex);
    if (matches) {
      return matches[0];
    }
  }

  return null;
};

const addressMatcher = (): ((value: string) => string | null) => {
  const regexes = [
    /P\.?O\.?\sBox\s+\d{6}\s[A-Z\s]+,\s[A-Z\s]+\d{5}/i,
    /\d+[A-Z\s,]+,\s[A-Z]{2}\s\d{5}(-\d{4})?/i,
  ];
  return (value: string) => matchesRegexList(regexes, value);
};

const phoneMatcher = (): ((value: string) => string | null) => {
  const regexes = [/\(\d{3}\)\s[\d-x\s]+/i, /((\d{1}-)?\d{3}-\d{3}-\d{4})/i];
  return (value: string) => matchesRegexList(regexes, value);
};

const emailMatcher = (): ((value: string) => string | null) => {
  const regexes = [/([a-z0-9_.-]+@[\da-z.-]+\.[a-z.]{2,6})/i];
  return (value: string) => {
    let matches = matchesRegexList(regexes, value);
    if (matches) {
      return matches;
    }

    // Takes into account certain typos
    matches = matchesRegexList(regexes, value.replace(/\s+/g, ''));
    if (matches) {
      return value;
    }

    return null;
  };
};

const matchers: {
  type: TermFormat;
  match: (value: string) => string | null;
}[] = [
  { type: 'email', match: emailMatcher() },
  { type: 'phone', match: phoneMatcher() },
  { type: 'address', match: addressMatcher() },
];

export const getFirstMatch = (text: string): FormatMatch | null => {
  for (const matcher of matchers) {
    const result = matcher.match(text);
    if (result) {
      return { format: matcher.type, value: result };
    }
  }

  return null;
};

/* Won't really work for overlapping matches - Hopefully, it's good enough*/
export const getAllMatches = (text: string): PartialFormatMatch[] => {
  const tmpResults: { format: TermFormat; index: number; value: string }[] = [];

  for (const matcher of matchers) {
    const result = matcher.match(text);
    if (result) {
      tmpResults.push({
        format: matcher.type,
        value: result.trim(),
        index: text.indexOf(result),
      });
    }
  }

  if (!tmpResults.length) {
    return [{ value: text }];
  }

  const results: PartialFormatMatch[] = [];
  tmpResults.sort((a, b) => a.index - b.index);

  let toExtract = text;
  let tmpIndex = 0;

  while (toExtract.length) {
    const result = tmpResults[tmpIndex];
    const startIndex = toExtract.indexOf(result.value);
    const endIndex = startIndex + result.value.length;

    if (startIndex > 0) {
      const prev = toExtract.substring(0, startIndex);
      results.push({ value: prev.trim() });
    }

    results.push(result);
    toExtract = toExtract.substring(endIndex, toExtract.length).trim();

    if (tmpIndex >= tmpResults.length - 1 && toExtract.length) {
      results.push({ value: toExtract });
      toExtract = '';
    }

    tmpIndex++;
  }

  return results;
};
