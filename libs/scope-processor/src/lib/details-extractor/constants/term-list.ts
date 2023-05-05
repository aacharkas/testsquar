import { KnownTerm, KnownTermMatch } from '../../interfaces/terms';

export const ignorePageTerms = [
  'SUMMARY GUIDE',
  'YOUR GUIDE',
  'A. CLAIM NUMBER',
  'FACTOR DETAIL',
  'UNFACTORED ITEMS',
  'SAMPLE ESTIMATE',
];

const knownTerms: KnownTerm[] = [
  { term: 'COMPANY', group: 'companies' },
  { term: 'INSURED', group: 'customers' },
  { term: 'CUSTOMER', group: 'customers' },
  { term: 'CLAIMANT', group: 'customers' },
  { term: 'CLIENT', group: 'customers' },
  { term: 'ESTIMATOR', group: 'adjusters' },
  { term: 'CLAIM REP', group: 'adjusters' },
  { term: 'CLAIM REP.', group: 'adjusters' },
  { term: 'POSITION', group: 'adjusters' },
  { term: 'PROPERTY', formats: ['address'] },
  { term: 'HOME', formats: ['address', 'phone'] },
  { term: 'BUSINESS', formats: ['address', 'phone'] },
  { term: 'CELLULAR', formats: ['phone'] },
  { term: 'CELL', formats: ['phone'] },
  { term: 'ALTERNATE', formats: ['phone'] },
  { term: 'FAX', formats: ['phone'] },
  { term: 'PHONE', formats: ['phone'] },
  { term: 'OTHER', formats: ['phone'] },
  { term: 'OFFICE', formats: ['phone'] },
  { term: 'OFFCE', formats: ['phone'] }, // Typo or maybe some short version
  { term: 'E-MAIL', formats: ['email'] },
  { term: 'DATE CONTACTED', property: 'dateContacted', group: 'dates' },
  { term: 'DATE OF LOSS', property: 'dateOfLoss', group: 'dates' },
  { term: 'DATE INSPECTED', property: 'dateInspected', group: 'dates' },
  { term: 'DATE EST. COMPLETED', property: 'dateEstCompleted', group: 'dates' },
  { term: 'DATE RECEIVED', property: 'dateReceived', group: 'dates' },
  { term: 'DATE ENTERED', property: 'dateEntered', group: 'dates' },
  { term: 'CLAIM NUMBER', property: 'claimNumber', group: 'claim' },
  { term: 'POLICY NUMBER', property: 'policyNumber', group: 'claim' },
  { term: 'TYPE OF LOSS', property: 'typeOfLoss', group: 'claim' },
  { term: 'CAUSE OF LOSS' },
  { term: 'PRICE LIST', property: 'priceList', group: 'claim' },
  { term: 'ESTIMATE NAME', property: 'estimateName', group: 'claim' },
  { term: 'ESTIMATE', property: 'estimateName', group: 'claim' },
];

export const findKnownTerm = (text: string): KnownTermMatch | null => {
  const toCompare = text.toUpperCase();
  const match = knownTerms.find((t) => toCompare.endsWith(t.term));
  if (match) {
    const index = toCompare.indexOf(match.term);
    const value = text.substring(index, index + match.term.length);

    return { ...match, index, value };
  }

  return null;
};
