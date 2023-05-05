import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { getPdfFilesSchema } from './get-pdf-files';
import { getUploadUrlSchema } from './get-upload-url.schema';

export const fileSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'File',
    description: 'File Functions',
  },
  schemas: [getUploadUrlSchema, getPdfFilesSchema],
};
