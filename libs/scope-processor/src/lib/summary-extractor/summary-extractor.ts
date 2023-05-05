import {
  StructuredData,
  StructuredElement,
} from '@squaredash/shared/apis/adobe-sdk';
import { Summary } from '@squaredash/shared/models';

export const extractSummary = (data: StructuredData) => {
  const isSummaryTitle = (text: string): boolean => {
    if (text) {
      return text.toLowerCase().includes('summary for');
    }
    return false;
  };

  const getSummaryPages = () => {
    const summaryPageElements = data.elements.filter((e: StructuredElement) =>
      isSummaryTitle(e.Text || '')
    );
    const summaryPagesTemp: Array<Array<StructuredElement>> = [];
    summaryPageElements.forEach((element: StructuredElement) => {
      summaryPagesTemp.push(
        data.elements.filter((e) => e.Page === element.Page)
      );
    });
    return summaryPagesTemp;
  };

  const splitPagesIntoLines = (
    pages: Array<Array<StructuredElement>>
  ): Array<Array<string>> => {
    const horizontalLinesTemp: Array<Array<string>> = [];
    pages.forEach((page: Array<StructuredElement>) => {
      const summaryStartIndex = page.findIndex((e) =>
        isSummaryTitle(e.Text || '')
      );
      const tempLinesArray: Array<string> = [];
      let i = 0;
      while (i < page.length) {
        if (i >= summaryStartIndex) {
          let lineText = '';
          const elementsOnThatExactLine = page.filter((e) => {
            if (e.Bounds) {
              const tempPage = page as Array<Required<StructuredElement>>;
              return e.Bounds[3] === tempPage[i].Bounds[3];
            }
            return false;
          });
          elementsOnThatExactLine.forEach((pageElement) => {
            if (pageElement.Text) {
              lineText += pageElement.Text;
            }
          });
          if (!tempLinesArray.includes(lineText)) {
            tempLinesArray.push(lineText);
          }
          const indexOfLastLineElement = page.indexOf(
            elementsOnThatExactLine[elementsOnThatExactLine.length - 1]
          );
          i = indexOfLastLineElement > i ? indexOfLastLineElement : i + 1;
        } else {
          i++;
        }
      }
      horizontalLinesTemp.push(tempLinesArray);
    });

    return horizontalLinesTemp;
  };

  const separateSummaryLines = (lines: Array<Array<string>>) => {
    const numberRegex = /(\d*,?\d+[.]\d{2})/;
    const globalNumberRegex = /(\d*,?\d+[.]\d{2})/g;
    const structuredSummaryArray: Array<Summary> = [];

    lines.forEach((summary: Array<string>) => {
      const structuredSummary: Summary = {
        title: '',
        summaries: [],
      };
      summary.forEach((pageLine: string, index: number) => {
        if (isSummaryTitle(pageLine)) {
          if (index === 0) {
            structuredSummary.title = pageLine;
          } else if (index === 1) {
            structuredSummary.subtitle = pageLine;
          }
        } else if (pageLine.match(numberRegex)) {
          const numberValue = (pageLine.match(numberRegex) || ['0'])[0];
          let lineTitle = pageLine.replaceAll(globalNumberRegex, '');
          lineTitle = lineTitle.replaceAll(/\W/g, '');
          structuredSummary.summaries.push({
            title: lineTitle.trim(),
            value: Number(numberValue.replaceAll(',', '')),
          });
        }
      });
      structuredSummaryArray.push(structuredSummary);
    });

    return structuredSummaryArray;
  };

  const summaryPages = getSummaryPages();
  const horizontalLines = splitPagesIntoLines(summaryPages);
  return separateSummaryLines(horizontalLines);
};
