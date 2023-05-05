import yargs from 'yargs';

import { ScopeProcessor } from '@squaredash/scope-processor';

const scopeProcessor = new ScopeProcessor();

yargs(process.argv.slice(2))
  .command({
    command: 'run',
    builder: (yargs) =>
      yargs
        .option('bucketName', {
          type: 'string',
          description: 'Name of the S3 bucket',
        })
        .option('path', {
          type: 'string',
          description:
            'Folder (with required structure) or file to be processed',
        }),

    handler: (yargs) => {
      scopeProcessor.processPath(yargs.bucketName, yargs.path);
    },
  })
  .command({
    command: 'generate-results',
    handler: () => {
      scopeProcessor.processBucket('sample-scopes');
    },
  })
  .scriptName('squaredash-scope-processor-executor').argv;
