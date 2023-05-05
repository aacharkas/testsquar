interface CompanyMatchingData {
  name: string;
  terms: string[];
}

const companyMatchers: CompanyMatchingData[] = [
  {
    name: 'Allstate',
    terms: ['Allstate', 'National Catastrophe Team'],
  },
  {
    name: 'State Farm',
    terms: ['State Farm'],
  },
  {
    name: 'Liberty Mutual Insurance',
    terms: ['Liberty Mutual Insurance'],
  },
  {
    name: 'USAA',
    terms: ['ALLCAT', 'A USAA Service Provider'],
  },
  {
    name: 'Farmers Insurance',
    terms: ['Texas Farmers Insurance Company'],
  },
  {
    name: 'Auto Club Indemnity Company',
    terms: [
      'Auto Club Indemnity Company',
      'Interinsurance Exchange of the Automobile Club',
    ],
  },
];

export const findCompanyByTerm = (term: string): string | undefined => {
  return companyMatchers.find(
    (matcher) =>
      matcher.terms.findIndex(
        (tr) => tr.toLowerCase() === term.toLowerCase()
      ) !== -1
  )?.name;
};
