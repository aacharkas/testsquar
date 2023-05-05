import * as PDFServicesSdk from '@adobe/pdfservices-node-sdk';
import { Readable } from 'stream';

import { AdobeConfig } from './interfaces/adobe-config';

export class AdobeClient {
  private readonly executionContext: PDFServicesSdk.ExecutionContext;

  constructor(config: AdobeConfig) {
    const credentials =
      PDFServicesSdk.Credentials.serviceAccountCredentialsBuilder()
        .withClientId(config.clientid)
        .withAccountId(config.accountid)
        .withOrganizationId(config.organizationid)
        .withClientSecret(config.clientsecret)
        .withPrivateKey(config.privatekey.replace(/\\n/g, '\n'))
        .build();

    const clientConfig = PDFServicesSdk.ClientConfig.clientConfigBuilder()
      .withConnectTimeout(10000)
      .withReadTimeout(40000)
      .build();

    this.executionContext = PDFServicesSdk.ExecutionContext.create(
      credentials,
      clientConfig
    );
  }

  extractPdf(
    stream: Readable
  ): Promise<{ saveAsFile: (fileName: string) => Promise<void> }> {
    const options =
      new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(
          PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT,
          // @ts-ignore
          PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES
        )
        .addElementsToExtractRenditions(
          PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES
        )
        .addTableStructureFormat(
          PDFServicesSdk.ExtractPDF.options.TableStructureType.CSV
        )
        .build();

    const input = PDFServicesSdk.FileRef.createFromStream(
      stream,
      PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
    );

    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();

    extractPDFOperation.setInput(input);
    extractPDFOperation.setOptions(options);

    return extractPDFOperation.execute(this.executionContext);
  }
}
