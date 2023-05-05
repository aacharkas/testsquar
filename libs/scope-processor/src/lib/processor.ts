import { readFile } from 'fs/promises';
import os from 'os';
import path from 'path';

import { AdobeClient, AdobeConfig } from '@squaredash/shared/apis/adobe-sdk';
import { AwsClient, S3Client } from '@squaredash/shared/apis/aws-sdk';
import { ScopeContent } from '@squaredash/shared/models';
import { Logger, extractInto, silentDeleteDir } from '@squaredash/shared/util';
import { Config } from '@squaredash/shared/util';

import { extractDetails } from './details-extractor/details-extractor';
import { extractGroups } from './groups-extractor/groups-extractor';
import { extractSummary } from './summary-extractor/summary-extractor';

export class ScopeProcessor {
  private readonly awsClient: AwsClient;
  private readonly s3Client: S3Client;
  private readonly adobeClient: AdobeClient;
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
    this.awsClient = new AwsClient();
    this.s3Client = this.awsClient.getS3({ apiVersion: '2006-03-01' });
    this.adobeClient = new AdobeClient(Config.ADOBE as AdobeConfig);
  }

  async processBucket(bucketName: string) {
    try {
      const bucketContent = await this.s3Client.getBucketContent(
        bucketName,
        ''
      );
      for (const scope of bucketContent) {
        await this.processPath(bucketName, scope.Key as string);
      }
    } catch (e) {
      this.logger.log(e);
    }
  }

  async processPath(
    bucketName: string,
    objectPath: string
  ): Promise<Promise<ScopeContent | null>[]> {
    const isFolder = await this.s3Client.isFolder(bucketName, objectPath);
    return isFolder
      ? this.processFolder(bucketName, objectPath)
      : [this.processFile(bucketName, objectPath)];
  }

  async processFile(bucketName: string, objectPath: string) {
    const targetFileName = `${path.basename(bucketName, '.pdf')}.zip`;
    const tmpPath = path.join(os.tmpdir(), objectPath);
    const tmpZipPath = path.join(tmpPath, targetFileName);
    try {
      const fileRef = await this.adobeClient.extractPdf(
        this.s3Client
          .getObject({
            Bucket: bucketName,
            Key: objectPath,
          })
          .createReadStream()
      );

      await fileRef.saveAsFile(tmpZipPath);
      const count = await extractInto(tmpZipPath, tmpPath);
      this.logger.log(`Unzipped ${count} files. Extracting data...`);
      const structuredData = await readFile(
        path.join(tmpPath, 'structuredData.json')
      );
      const parsedData = JSON.parse(structuredData.toString());

      const details = extractDetails(parsedData);
      const { headers, groups, totals } = extractGroups(parsedData);

      const summaries = extractSummary(parsedData);

      this.logger.log('Extraction complete.');
      const content: ScopeContent = {
        ...details,
        headers,
        groups,
        totals,
        summaries,
      };
      this.logger.dir(content, 'log');
      return content;
    } catch (e) {
      this.logger.error(e);
    } finally {
      await silentDeleteDir(tmpPath);
      this.logger.log('Processing complete');
    }
    return null;
  }

  async processFolder(bucketName: string, folderPath: string) {
    const bucketContent = await this.s3Client.getBucketContent(
      bucketName,
      folderPath
    );
    return bucketContent
      .filter((obj) => obj.Key?.endsWith('.pdf'))
      .map((pdf) => {
        return this.processFile(bucketName, pdf.Key as string);
      });
  }

  async uploadScopeContentToS3(
    content: ScopeContent,
    bucketName: string,
    objectPath: string
  ) {
    await this.s3Client
      .putObject({
        Bucket: bucketName,
        Key: objectPath,
        Body: Buffer.from(JSON.stringify(content), 'utf-8'),
        ContentType: 'application/json',
      })
      .promise();
  }
}
