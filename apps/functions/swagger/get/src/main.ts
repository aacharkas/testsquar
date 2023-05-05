import { APIGatewayProxyResult } from 'aws-lambda';
import { renderFile } from 'ejs';
import 'openapi-types';
import * as path from 'path';

import { Config } from '@squaredash/shared/util';

import { mergeSchemas } from './merge-schemas';
import { schemas } from './schemas';

export const lambda = async (): Promise<APIGatewayProxyResult> => {
  const schemaSpec = mergeSchemas(schemas, Config.APP.url);
  const body = await renderFile(
    path.join(__dirname, 'assets', 'templates', 'index.ejs'),
    {
      schemaDescription: JSON.stringify(schemaSpec),
    }
  );

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html',
    },
    body,
  };
};
exports.handler = lambda;
