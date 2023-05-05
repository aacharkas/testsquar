import { StructuredData } from '@squaredash/shared/apis/adobe-sdk';

import { ignorePageTerms } from '../../details-extractor/constants/term-list';
import { DataElement } from '../../interfaces/data-element';

export class AdobeReader {
  startIgnoredPage: number | undefined;
  endIgnoredPage: number | undefined;

  constructor(private readonly data: StructuredData) {
    data.elements.forEach((element) => {
      if (
        element.Page !== undefined &&
        ignorePageTerms.some((t) => element.Text?.toUpperCase().includes(t))
      ) {
        if (!this.startIgnoredPage) {
          this.startIgnoredPage = element.Page;
          this.endIgnoredPage = element.Page;
        } else {
          this.endIgnoredPage = Math.max(
            element.Page,
            this.endIgnoredPage ?? 0
          );
        }
      }
    });
  }

  forEach(callback: (element: DataElement) => void) {
    this.data.elements
      .filter(
        (e) =>
          e.Text?.length &&
          e.Page &&
          (e.Page < (this.startIgnoredPage ?? 100) ||
            e.Page > (this.endIgnoredPage ?? -1))
      )
      .forEach((element) => {
        const text = (element.Text ?? '').trim();
        const bounds = {
          left: element.Bounds?.[0] ?? 0,
          bottom: element.Bounds?.[1] ?? 0,
          right: element.Bounds?.[2] ?? 0,
          top: element.Bounds?.[3] ?? 0,
        };
        const page = element.Page ?? 0;
        const textSize = element.TextSize ?? 0;

        callback({ text, bounds, page, textSize });
      });
  }
}
