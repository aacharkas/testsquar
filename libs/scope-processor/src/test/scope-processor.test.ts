import chai, { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiDiff from 'chai-diff';
import { existsSync, lstatSync, readFileSync, readdirSync } from 'fs';
import path from 'path';

import { extractDetails } from '../lib/details-extractor/details-extractor';
import { extractGroups } from '../lib/groups-extractor/groups-extractor';
import { extractSummary } from '../lib/summary-extractor/summary-extractor';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
chai.use(chaiDiff);

describe('Scope processing scenario tests', () => {
  const basePath = path.join(__dirname, 'resources');
  const files = readdirSync(basePath);

  files
    .filter((file) => !file.startsWith('5601')) // Exceptions
    .map((file) => path.join(basePath, file))
    .filter((file) => lstatSync(file).isDirectory())
    .forEach((directory) => {
      const testName = path.basename(directory);

      const expectedDetailsPath = path.join(directory, 'expected-details.json');
      const expectedSummaryPath = path.join(directory, 'expected-summary.json');
      const expectedGroupsPath = path.join(directory, 'expected-groups.json');
      const expectedTotalsPath = path.join(directory, 'expected-totals.json');
      const expectedHeadersPath = path.join(directory, 'expected-headers.json');

      const expectedPaths = [
        expectedDetailsPath,
        expectedSummaryPath,
        expectedGroupsPath,
        expectedTotalsPath,
        expectedHeadersPath,
      ];

      if (expectedPaths.every((p) => existsSync(p))) {
        const structuredData = readFileSync(
          path.join(directory, 'structuredData.json')
        );
        const data = JSON.parse(structuredData.toString());

        it(`[Details] Scope: ${testName}`, () => {
          const details = extractDetails(data);
          const expectedDetails = JSON.parse(
            readFileSync(expectedDetailsPath).toString()
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(details).not.differentFrom(expectedDetails);
        });

        it(`[Summary]: Scope: ${testName}`, () => {
          const summary = extractSummary(data);
          const expectedSummary = JSON.parse(
            readFileSync(expectedSummaryPath).toString()
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(summary).not.differentFrom(expectedSummary);
        });

        const { headers, groups, totals } = extractGroups(data);

        it(`[Headers]: Scope: ${testName}`, () => {
          const expectedHeaders = JSON.parse(
            readFileSync(expectedHeadersPath).toString()
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(headers).not.differentFrom(expectedHeaders);
        });

        it(`[Groups]: Scope: ${testName}`, () => {
          const expectedGroups = JSON.parse(
            readFileSync(expectedGroupsPath).toString()
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(groups).not.differentFrom(expectedGroups);
        });

        it(`[Totals]: Scope: ${testName}`, () => {
          const expectedTotals = JSON.parse(
            readFileSync(expectedTotalsPath).toString()
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(totals).not.differentFrom(expectedTotals);
        });
      }
    });
});
